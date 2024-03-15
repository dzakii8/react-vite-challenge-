if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const cors = require('cors')
const express = require('express')
const router = require('./routers')
const errorHandler = require('./errorHandler')
const app = express()



app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use(router)

app.use(errorHandler)


module.exports = app