const express = require('express')
const lodgingController = require('../controllers/lodgingController')
const authentication = require('../midlewares/authentication.js')
const {authorization} = require('../midlewares/authorization.js')
const lodging =  express.Router()

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})
// console.log(upload);

//aunthetication
lodging.use(authentication)
lodging.post('/', lodgingController.postLodging)
lodging.get('/', lodgingController.getAllPubLodging)
lodging.get('/:id', lodgingController.getPubById)
lodging.put('/:id',authorization, lodgingController.putById)
lodging.patch('/:id',authorization,upload.single('image'), lodgingController.patchById)
lodging.delete('/:id',authorization, lodgingController.deleteById)



module.exports = lodging

