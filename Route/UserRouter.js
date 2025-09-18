const Userconfig = require('../Controller/Userconfig')
const express = require('express')
const Router = express.Router()
Router.post('/saveUser', Userconfig.saveUser)

Router.post('/loginuser', Userconfig.loginUSer)
module.exports = Router