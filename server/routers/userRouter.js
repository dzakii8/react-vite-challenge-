const express = require('express')
const userController = require('../controllers/userController')
const authentication = require('../midlewares/authentication')
const {authorizationRegis} = require('../midlewares/authorization')
const user =  express.Router()

user.post('/add-user', authentication,authorizationRegis,userController.register)
user.post('/login', userController.login)

module.exports = user