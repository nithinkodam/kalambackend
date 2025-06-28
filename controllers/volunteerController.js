// import  express from 'express';
// router = express.Router();
// import Volunteer from '../models/volunteerSchema.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

router.post('/signup',signup)
// router.post('/login',login) 

const signup = async (req, res) => {
    try {
        const { name, age , gender  , address, qualification, volunteerDuration, centre } = req.body;
        const existingVolunteer = await Volunteer.findOne({ name });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Volunteer already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const volunteer = new Volunteer({
            name,
            age,
            gender,
            address,
            qualification,
            volunteerDuration,
            centre
        });

//         await volunteer.save();
//         const token = jwt.sign(
//             { volunteerId: volunteer._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );
//         res.status(201).json({
//             token,
//             volunteer: {
//                 name,
//                 centre
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating volunteer', error: error.message });
//     }
// };




// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find volunteer
//         const volunteer = await Volunteer.findOne({ email });
//         if (!volunteer) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, volunteer.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Generate token
//         const token = jwt.sign(
//             { volunteerId: volunteer._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );

//         // Send response
//         res.json({
//             token,
//             volunteer: {
//                 id: volunteer._id,
//                 name: volunteer.name,
//                 email: volunteer.email,
//                 phone: volunteer.phone,
//                 address: volunteer.address
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
// };

// export {
//     signup,
//     login
// }

router.get('/data', async (req, res) => {
    try {
        return res.json({"data":"success"});
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching volunteers', error: error.message });
    }
});




router.post('/signup',signup)


// router.post('/signup',signup)
// router.post('/login',login) 

// module.exports = router