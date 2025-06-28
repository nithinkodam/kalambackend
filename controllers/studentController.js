const express = require('express');
require('dotenv').config()
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const Student = require('../models/studentSchema')

router.post('/signup', async (req, res) => {
  console.log(req.body, "Hello");

  const {
    name,
    password,
    photo,
    age,
    gender,
    centre,
    ex_skills,
    address,
    classs,
    fathername,
    flagged,
    attendance,
    marks
  } = req.body;

  try {
    const existingUser = await Student.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const student = new Student({
      name,
      password,
      photo,
      age,
      gender,
      centre,
      ex_skills,
      address,
      class: classs,
      fathername,
      flagged,
      attendance,
      marks
    });

    await student.save();

    const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(201).json({ token, user: { id: student._id, name: student.name } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);

    const result = await Student.findOne({ name });
    console.log(result);

    if (!result) {
        return res.status(404).json({ message: 'User not found' });
    }

    const pass = await bcrypt.compare(password, result.password);
    // console.log(pass)
    if (!pass) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ name: result.name }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.status(200).json({ message: 'Login successful', token });
});


router.post('/poststudent', async(req,res)=>{
    
})

module.exports = router