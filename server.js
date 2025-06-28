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


exp.post('/register', async(req,res)=>{
    const { username, password, role } = req.body
    const result = await User.findOne({ username : username })
    if(result){
        return res.status(401).json({ message : 'User already exists' })
    }
    hashedPassword = await bcrypt.hash(password, 10)
    const user = {
        username : username,
        password : hashedPassword,
    }
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ message : 'User registered' })
})


exp.post('/login', async(req,res)=>{
    const { username, password } = req.body
    const result = await User.findOne({ username : username })
    if(!result){
        return res.status(404).json({ message : 'User not found' })
    }
    let pass = await bcrypt.compare(password, result.password)
    if(!pass){
        return res.status(401).json({ message : 'Invalid credentials' })
    }
    const token = jwt.sign({ username : result.username, role : result.role }, SECRET_KEY, { expiresIn : '12h'} )
    return res.status(200).json({ message : 'Login successful', token : token })
})