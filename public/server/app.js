let express = require('express')
let https = require('https')
let fs = require('fs')
let path = require('path')
let app = express()
let cors = require('cors')
let axios = require('axios')
let accountService = require('./service/accountService')
let base = process.argv[2]
var options = {
    key: fs.readFileSync(path.join(base, './certificate/privatekey.pem')),
    cert: fs.readFileSync(path.join(base, './certificate/certificate.pem')),
    ca: fs.readFileSync(path.join(base, './certificate/certrequest.csr'))
}

app.use(express.urlencoded({extended: false}))
app.use(cors())              //配置跨域，必须在路由之前
app.use(accountService)


const httpsServer = https.createServer(options, app)
var ip = '11.11.11.11'
axios.get('https://myip.ipip.net')
  .then(function (response) {
    // handle success
    var reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
    ip = response.data.match(reg)
    httpsServer.listen(3600, () => {
        console.log(`服务器启动成功:${ip}`)
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
