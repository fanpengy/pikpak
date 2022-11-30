import axios from 'axios'
import router from '../router/index'

const instance = axios.create({})

instance.interceptors.request.use(request => {
  const pikpakLogin = JSON.parse(window.localStorage.getItem('pikpakLogin') || '{}')
  request.headers = request.headers || {}
  if (pikpakLogin.access_token) {
    request.headers['Authorization'] = `${pikpakLogin.token_type || 'Bearer'} ${pikpakLogin.access_token}`
  }
  if(request.url?.indexOf('https://', 4) === -1) {
    const proxyArray = JSON.parse(window.localStorage.getItem('proxy') || '[]')
    if (proxyArray.length > 0) {
      const index = Math.floor((Math.random() * proxyArray.length))
      request.url = proxyArray[index] + '/' + request.url
    }
  }
  return request
})
let isLoginLoading = false
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  const { response, config } = error
  if(response.status) {
    switch (response.status) {
      case 401:
        console.log(1)
        // router.push('/login')
        const loginData = window.localStorage.getItem('pikpakLoginData')
        const loginDataJson = loginData ? JSON.parse(loginData) : {}
        if(loginDataJson.username && loginDataJson.password && !isLoginLoading) {
          console.log('wait', config.url)
          isLoginLoading = true
          return instance.post('https://user.mypikpak.com/v1/auth/signin', {
            "captcha_token": "",
            "client_id": "YNxT9w7GMdWvEOKa",
            "client_secret": "dbw2OtmVEeuUvIptb1Coyg",
            ...loginDataJson
          })
            .then((res:any) => {
              if(res.data && res.data.access_token) {
                window.localStorage.setItem('pikpakLogin', JSON.stringify(res.data))
              }
              isLoginLoading = false
              return instance(config)
            })
            .catch(() => {
              router.push('/login')
              return false
            })
        } else if(loginDataJson.username && loginDataJson.password && isLoginLoading) {
          return new Promise((resolve, reject) => {
            const s = setInterval(() => {
              if(!isLoginLoading) {
                clearInterval(s)
                resolve(instance(config))
              }
            }, 100)
          })
        } else {
          router.push('/login?redirect=' + router.currentRoute.value.fullPath)
          return Promise.reject(error)
        }
        
        break;
      // case 400:  case 403:
      //   window.$message.error(response.data.error_description || '出错了')
      case 403:
        if(response?.data?.error === 'task_daily_create_limit') {
          const login = JSON.parse(window.localStorage.getItem('pikpakLogin') || '{}')
          const accountId = login.id ? login.id : -1
          const accountsData = window.localStorage.getItem('accounts')
          var accounts = accountsData ? JSON.parse(accountsData) : []
          let accountUseful = false
          accounts = accounts.map((account:any) => {
            if(account.id === accountId) {
              account.used = true
              account.blockTime = new Date().getTime
            }
            return account
          })
          if(accounts.every((account:any) => account.used)) {
            // no useful account, try to revert
            const now = new Date()
            now.setHours(0,0,0,0)
            const todayStart = now.getTime()
            accounts = accounts.map((account:any) => {
              if(account.blockTime && account.blockTime < todayStart) {
                account.blockTime = undefined
                account.used = false
              }
              return account
            })
          }
          const account = accounts.find((account:any) => !account.used)
          if(account) {
            if(!isLoginLoading) {
              const loginDataJson = {
                username: account.email,
                password: account.password
              }
              isLoginLoading = true
              return instance.post('https://user.mypikpak.com/v1/auth/signin', {
                "captcha_token": "",
                "client_id": "YNxT9w7GMdWvEOKa",
                "client_secret": "dbw2OtmVEeuUvIptb1Coyg",
                ...loginDataJson
              })
                .then((res:any) => {
                  if(res.data && res.data.access_token) {
                    res.data.id = account.id
                    window.localStorage.setItem('pikpakLogin', JSON.stringify(res.data))
                  }
                  isLoginLoading = false
                  window.$message.error('您今日的免费使用次数已达上限，切换账号后请重启')
                  router.push('/list')
                  return false
                })
                .catch(() => {
                  window.localStorage.removeItem('pikpakLogin')
                  router.push('/login')
                  return false
                }).finally(() => {
                  window.localStorage.setItem('accounts', JSON.stringify(accounts))
                })
            } else {
              return new Promise((resolve, reject) => {
                const s = setInterval(() => {
                  if(!isLoginLoading) {
                    clearInterval(s)
                    //resolve(instance(config))
                    window.localStorage.setItem('accounts', JSON.stringify(accounts))
                    router.push('/list')
                    return false
                  }
                }, 100)
              })
            }
          } else {
            // no useful account
            window.$message.error(response?.data?.error_description || '出错了')
            window.localStorage.setItem('accounts', JSON.stringify(accounts))
            window.localStorage.removeItem('pikpakLogin')
            window.localStorage.removeItem('pikpakLoginData')
            router.push('/login')
          }
        } else {
          window.$message.error(response?.data?.error_description || '出错了')
        }
        break
      default:
        window.$message.error(response?.data?.error_description || '出错了')
        break
    }
  }
  console.log(config.url, 111)
  return Promise.reject(error)
})

const instance2 = axios.create({})
instance2.interceptors.request.use(request => {
  request.headers = {
    Authorization: 'Bearer secret_FErDcv3kgsFNLiWUDOWYdJhNqOIKj55eteBg3vIoiLt',
    'Notion-Version': '2021-08-16',
    'Content-Type': 'application/json'
  }
  const proxyArray = JSON.parse(window.localStorage.getItem('proxy') || '[]')
  if (proxyArray.length > 0) {
    const index = Math.floor((Math.random() * proxyArray.length))
    request.url = proxyArray[index] + '/' + request.url
  }
  return request
})

export const notionHttp = instance2
export default instance
