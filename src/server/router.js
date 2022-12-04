let express = require('express')
let router = express.Router()
let user = require('./api/userApi')


router.get('/user', user.get)

module.exports = router