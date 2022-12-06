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
          const optimise = JSON.parse(localStorage.getItem('pikpakOptimize') || '{}')
          if(optimise.autoChangeAccount) {
            const accountId = login.id ? login.id : -1
            if(accountId > -1) {
              accountApi.used(accountId)
                .catch(err => {
                  console.error(err)
                })
            }
            accountApi.query()
              .then((res:any) => { 
                if(res.data.length <=0 ) {
                  // no useful account
                  window.$message.error('没有可用账号，即将跳转到登陆')
                  window.localStorage.removeItem('pikpakLogin')
                  window.localStorage.removeItem('pikpakLoginData')
                  router.push('/login')
                } else {
                  const account = res.data[0]
                  if(!isLoginLoading) {
                    const email = aes.decrypt(account.email, optimise.key)
                    const password = aes.decrypt(account.password, optimise.key)
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
                        window.$message.error('您今日的免费使用次数已达上限，切换账号后请刷新')
                        router.push('/list')
                        return false
                      })
                      .catch(() => {
                        //window.localStorage.removeItem('pikpakLogin')
                        //router.push('/login')
                        window.$message.error('自动切换账号失败，请重试或手动切换')
                        return false
                      })
                  } else {
                    return new Promise((resolve, reject) => {
                      const s = setInterval(() => {
                        if(!isLoginLoading) {
                          clearInterval(s)
                          //resolve(instance(config))
                          router.push('/list')
                          return false
                        }
                      }, 100)
                    })
                  }
                }
              })
              .catch( err => {
                console.log(err)
                window.$message.error('查询账号异常，请重试')
              })
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
  console.log('url',url)
  if(url && !url?.startsWith('http://localhost:3000')) {
    const optimise = JSON.parse(localStorage.getItem('pikpakOptimize') || '{}')
    if(optimise.autoChangeAccount) {
      //https://encryptuyhasiuhsiusdecrypt/api/account_get
      var start = url.indexOf('encrypt') + 7
      var end = url.indexOf('decrypt')
      var encrypted = url?.substring(start, end)
      var domain = aes.decrypt(encrypted, optimise.key)
      request.url = 'https://' + domain + url.substring(end + 7)
    }
  }
  return request
})

export const notionHttp = instance2
export const sqlClient = instance3
export default instance
