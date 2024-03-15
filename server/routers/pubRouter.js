const express = require('express')
const lodgingController = require('../controllers/lodgingController')
const pub =  express.Router()

pub.get('/', lodgingController.getAllPubLodging)
pub.get('/:id', lodgingController.getPubById)


module.exports = pub

