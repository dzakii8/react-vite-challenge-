const express = require('express')
const user = require('./userRouter')
const lodging = require('./lodgingRouter')
const type = require('./typeRouter')
const pub = require('./pubRouter')
const router =  express.Router()

router.use('/users', user)
router.use('/pub', pub)
router.use('/lodgings', lodging)
router.use('/types', type)

module.exports = router
