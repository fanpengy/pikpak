let mysql = require('mysql')

console.log(process.argv)
var arg = process.argv[3];
console.log(arg)

let db = mysql.createPool({
    host: 'mysql.sqlpub.com',     //数据库IP地址
    user: 'fanpengy',          //数据库登录账号
    password: '0934d1011fc8f0a7',      //数据库登录密码
    database: 'sanxingdui',       //要操作的数据库
    port: 3306
})

module.exports = db