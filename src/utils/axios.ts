import axios from 'axios'
import router from '../router/index'
import accountApi from '../api/accountApi'
import aes from './aes'

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
}, async (error) => {
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
          const optimize = JSON.parse(localStorage.getItem('pikpakOptimize') || '{}')
          if(optimize.accountAutomatic) {
            const accountId = login.id ? login.id : -1
            let account:any = {}
            if(!optimize.accountLocal) {
              if(accountId > -1) {
                let result = await usedAccount(accountId)
                if(result === 0) {
                  window.$message.error('处理账号失败')
                } else {
                  account = await getAccount()
                }
              } else {
                account = await getAccount()
              }
            } else {
                if(accountId > -1) {
                  usedLocalAccount(accountId)
                }
                account = getLocalAccount()
            }
            if(account.id && account.id > 0) {
              if(!isLoginLoading) {
                const email = aes.decrypt(account.email, optimize.key)
                const password = aes.decrypt(account.password, optimize.key)
                const loginDataJson = {
                  username: email,
                  password: password
                }
                console.debug(loginDataJson)
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
                    window.$message.success('登录成功')
                    router.push('/')
                  })
                  .catch(() => {
                    isLoginLoading = false
                    window.$message.error('自动登录失败')
                  })
              } else {
                return new Promise((resolve, reject) => {
                  const s = setInterval(() => {
                    if(!isLoginLoading) {
                      clearInterval(s)
                      //resolve(instance(config))
                      router.push('/list')
                    }
                  }, 100)
                })
              }
            } else {
              window.$message.error((response?.data?.error_description || '出错了') + ' 并且未获取到可用账号')
            }
          } else {
            window.$message.error(response?.data?.error_description || '出错了')
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

const instance3 = axios.create({})
instance3.interceptors.request.use(request => {
  var url = request.url
  const optimize = JSON.parse(localStorage.getItem('pikpakOptimize') || '{}')
  if(optimize.accountAutomatic && !optimize.accountLocal) {
    if(url && !url.startsWith('https://localhost:3000')) {
      //https://encryptuyhasiuhsiusdecrypt/account/get
      var start = url.indexOf('encrypt') + 7
      var end = url.indexOf('decrypt')
      var encrypted = url.substring(start, end)
      var domain = aes.decrypt(encrypted, optimize.key)
      request.url = 'https://' + domain + url.substring(end + 7)
      //使用反代
      const proxyArray = JSON.parse(window.localStorage.getItem('proxy') || '[]')
      if (proxyArray.length > 0) {
        const index = Math.floor((Math.random() * proxyArray.length))
        request.url = proxyArray[index] + '/' + request.url
      }
    } else {
      request.url = request.url?.replace("localhost",optimize.accountHost)
    }
  }
  return request
})

const instance4 = axios.create({})
instance4.interceptors.request.use(request => {
  var url = request.url
  const optimize = JSON.parse(localStorage.getItem('pikpakOptimize') || '{}')
  if(url && !url.startsWith('https://localhost:8081')) {
      //https://encryptuyhasiuhsiusdecrypt/api/account_get
      var start = url.indexOf('encrypt') + 7
      var end = url.indexOf('decrypt')
      var encrypted = url.substring(start, end)
      var domain = aes.decrypt(encrypted, optimize.key)
      request.url = 'https://' + domain + url.substring(end + 7)
    } else if(optimize.aria2Host) {
      request.url = request.url?.replace("localhost",optimize.aria2Host)
    }
  return request
})

const usedAccount = async (accountId:number) => {
  let accountsData = JSON.parse(window.localStorage.getItem('pikpakAccounts') || '{}')
  //判断accountsData.stamp，大于当前时间以accountsData.id为准
  let id = accountId
  let now = new Date()
  if(accountsData.stamp > now.getTime()) {
    if(accountsData.id > accountId) {
      id = accountsData.id
    }
  } else {
    now.setHours(0,0,0,0)
    let stamp = now.getTime() + 86400000
    accountsData.stamp = stamp
  }
  return await accountApi.use(id)
    .then(res => {
      accountsData.id = id
      window.localStorage.setItem('pikpakAccounts', JSON.stringify(accountsData))
      return id
    })
    .catch(err => {
      console.log(err)
      return 0
    })
}

const getAccount = async () => {
  return await accountApi.query()
  .then((res:any) => {
    if(res.data.length <= 0) {
      // no useful account
      window.$message.error('没有可用账号')
      return {}
    } else {
      return res.data[0]
    }
  })
  .catch(error => {
    console.log(error.response)
    window.$message.error('查询账号失败')
    return {}
  })
}

const usedLocalAccount = (accountId:number) => {
  let accountsData = JSON.parse(window.localStorage.getItem('pikpakAccounts') || '{}')
  let id = accountId
  let now = new Date()
  if(accountsData.stamp > now.getTime()) {
    if(accountsData.id > accountId) {
      id = accountsData.id
    }
  } else {
    now.setHours(0,0,0,0)
    let stamp = now.getTime() + 86400000
    accountsData.stamp = stamp
  }
  accountsData.id = id
  window.localStorage.setItem('pikpakAccounts', JSON.stringify(accountsData))
}

const getLocalAccount = () => {
  let account:any = {}
  let results = <any>[]
  let accountsData = JSON.parse(window.localStorage.getItem('pikpakAccounts') || '{}')
  if(!accountsData.stamp) {
    return account
  }
  let now = new Date()
  if(accountsData.stamp > now.getTime()) {
    results = accountsData.accounts.sort((a:any,b:any) => a.id - b.id).filter((a:any) => a.id > accountsData.id)
  } else {
    results = accountsData.accounts.sort((a:any,b:any) => a.id - b.id).filter((a:any) => a.id > 0)
  }
  if(results.length > 0) {
    account = results[0]
  } else {
    window.$message.error('没有可用账号')
  }
  return account
}

export const notionHttp = instance2
export const accountClient = instance3
export const aria2Client = instance4
export default instance
