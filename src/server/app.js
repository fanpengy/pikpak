let express = require('express')
let https = require('https')
let fs = require('fs')
let app = express()
let cors = require('cors')
//let bodyParser = require('body-parser')
let router = require('./router')

var options = {
    key: fs.readFileSync('./src/server/privatekey.pem'),
    cert: fs.readFileSync('./src/server/certificate.pem'),
    ca: fs.readFileSync('./src/server/certrequest.csr')
}

// app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}))
app.use(cors())              //配置跨域，必须在路由之前
app.use(router)              //配置路由


const httpsServer = https.createServer(options, app)

httpsServer.listen(3600, () => {
    console.log('服务器启动成功');
})