const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteerSchema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/multer.middleware');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// router.post('/login',login) 
const signup = async (req, res, next) => {
    try {
        const { name, centre, age, gender, address, qualification, volunteerDuration, password } = await req.body;
        const existingVolunteer = await Volunteer.findOne({ name });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Volunteer already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hello2");
        const file = req.file;
        if (file) {
            const path = file.path;
            const imageUrl = await uploadOnCloudinary(path);
            const images = imageUrl;
            const volunteer = new Volunteer({
            name,
            age,
            gender,
            address,
            qualification:[qualification],
            volunteerDuration,
            centre,
            password:hashedPassword,
            photo:images
            }
           );
        if(!volunteer){
            return res.status(400).json({ message: 'Volunteer not created' });
        }   
        await volunteer.save();
        res.status(201).json({
            volunteer: {
                name
            }
        });    
       }
       else{
        console.log("File not present")
       }
}

catch (error) {
    res.status(500).json({ message: 'Error creating volunteer', error: error.message });
}
}

const login = async (req, res) => {
    try {
        const { name , password } = req.body;

        // Find volunteer
        const volunteer = await Volunteer.findOne({ name });
        if (!volunteer) {
            return res.status(401).json({ message: 'Invalid name or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, volunteer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid name or password' });
        }

        // Generate token
        const token = jwt.sign(
            { volunteerId: volunteer._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response
        res.json({
            token,
            volunteer: {
                id: volunteer._id,
                name: volunteer.name,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Logout route
const logout = async (req, res) => {
    try {
        // Clear the token by sending an empty token
        res.json({
            message: 'Logged out successfully',
            token: ''
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};

router.post('/signup', upload.single('file'), signup);
router.post('/login', upload.none(), login);
router.post('/logout', upload.none(), logout);



module.exports = router;