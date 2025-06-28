const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
const User = require('./models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
const SECRET_KEY = process.env.SECRET_KEY

exp = express()

exp.use(cors())
exp.use(express.json())

const app = http.createServer(exp)

// app.listen(5000,()=>{
//     console.log(`Server is running on 5000`)
// })

mongoose.connect(MONGO_URI,{
}).then(()=>{
    console.log('MongoDB connected!')
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
})