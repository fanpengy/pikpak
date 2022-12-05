let mysql = require('mysql')
let db = mysql.createPool({
    host: process.argv[3],     //数据库IP地址
    user: process.argv[4],          //数据库登录账号
    password: process.argv[5],      //数据库登录密码
    database: process.argv[6],       //要操作的数据库
    port: 3306
})

module.exports = db