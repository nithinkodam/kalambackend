const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/studentSchema')

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { name, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


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

