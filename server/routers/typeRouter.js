const express = require('express')
const typeController = require('../controllers/typeController')
const authentication = require('../midlewares/authentication')
const { authorization, authorizationRegis } = require('../midlewares/authorization')
const type =  express.Router()

type.get('/', authentication,authorizationRegis,typeController.getAll)
type.post('/',authentication,authorizationRegis, typeController.postType)
type.put('/:id',authentication,authorizationRegis, typeController.putById)

module.exports = type
