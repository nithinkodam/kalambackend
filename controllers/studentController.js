const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Student = require('../models/studentSchema')

// POST /api/signup
router.post('/signup', async (req, res) => {


    console.log(req.body,"Hello")
  const { name, password, photo, age, gender, centre, ex_skills, address, classs, fathername, flagged, attendance, marks } = req.body;
  try {
    // Check if user exists
    const existingUser = await Student.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = new Student({ name, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(201).json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async(req,res)=>{
    const { name, password } = req.body
    const result = await Student.findOne({ name : name })
    if(!result){
        return res.status(404).json({ message : 'User not found' })
    }
    let pass = await bcrypt.compare(password, result.password)
    if(!pass){
        return res.status(401).json({ message : 'Invalid credentials' })
    }
    const token = jwt.sign({ name : result.name }, SECRET_KEY, { expiresIn : '12h'} )
    return res.status(200).json({ message : 'Login successful', token : token })
}) 




module.exports = router