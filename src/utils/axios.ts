import axios from 'axios'
import router from '../router/index'
import accountApi from '../api/accountApi'
import aes from './aes'
import { optimizeStore, configStore, loginStore } from './localstore'

const instance = axios.create({})

instance.interceptors.request.use(request => {
  const pikpakLogin = loginStore.getLoginInfo()
  request.headers = request.headers || {}
  if (pikpakLogin.access_token) {
    request.headers['Authorization'] = `${pikpakLogin.token_type || 'Bearer'} ${pikpakLogin.access_token}`
  }
  if(request.url?.indexOf('https://', 4) === -1) {
    const proxyArray = configStore.getProxys()
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
        const loginData = loginStore.getCurrent()
        console.log(loginData)
        const loginDataJson = loginData
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
                loginStore.saveLoginInfo(res.data)
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
          const login = loginStore.getLoginInfo()
          const optimize = optimizeStore.getOptimizeData()
          if(optimize?.accountAutomatic) {
            window.$message.warning((response?.data?.error_description || '出错了') + ' 尝试切换账号')
            const accountId = login.id ? login.id : -1
            let account:any = {}
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
            if(account.id && account.id > 0) {
              window.$message.success('获取账号成功: ' + account.id + '，尝试登陆')
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
                      loginStore.saveLoginInfo(res.data)
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
              window.$message.error('获取账号失败！')
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
  const proxyArray = configStore.getProxys()
  if (proxyArray.length > 0) {
    const index = Math.floor((Math.random() * proxyArray.length))
    request.url = proxyArray[index] + '/' + request.url
  }
  return request
})

const instance3 = axios.create({})
instance3.interceptors.request.use(request => {
  var url = request?.url
  const optimize = optimizeStore.getOptimizeData()
  if(url && optimize.accountAutomatic && optimize.accountHost) {
    if(!url.startsWith('https://localhost:3000')) {
      //https://encryptuyhasiuhsiusdecrypt/account/get
      var start = url.indexOf('encrypt') + 7
      var end = url.indexOf('decrypt')
      var encrypted = url.substring(start, end)
      var domain = aes.decrypt(encrypted, optimize.key)
      request.url = 'https://' + domain + url.substring(end + 7)
      //使用反代
      const proxyArray = configStore.getProxys()
      if (proxyArray.length > 0) {
        const index = Math.floor((Math.random() * proxyArray.length))
        request.url = proxyArray[index] + '/' + request.url
      }
    } else {
      url = url.replace("localhost:3000",optimize.accountHost)
      if(optimize.accountHost.search(/:/g) === -1) {
        const proxyArray = configStore.getProxys()
        if (proxyArray.length > 0) {
          const index = Math.floor((Math.random() * proxyArray.length))
          url = proxyArray[index] + '/' + url
        }
      }
      request.url = url
    }
  }
  return request
})

const usedAccount = async (accountId:number) => {
    return await accountApi.use(accountId)
    .then(res => {
      return accountId
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

export const notionHttp = instance2
export const accountClient = instance3
export default instance
