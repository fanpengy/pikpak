let express = require('express')
let https = require('https')
let fs = require('fs')
let path = require('path')
let app = express()
let cors = require('cors')
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


httpsServer.listen(80, () => {
    console.log('服务器启动成功');
})