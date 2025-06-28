// const User = require('../models/User');
// const ApiError = require('../utils/ApiError');
// const ApiResponse = require('../utils/ApiResponse');
// const asyncHandler = require('../middleware/asyncHandler');

// const registerUser = asyncHandler(async (req, res) => {
//     const { fullname, username, email, password, role } = req.body;
    
//     if (!fullname || !username || !password || !email) {
//         throw new ApiError(401, "all fields are required");
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) throw new ApiError(402, "User already Exists !!");

//     const user = await User.create({
//         fullname,
//         email,
//         username,
//         password,
//         role: "user"
//     });

//     const createdUser = await User.findById(user._id).select("-password");
    
//     return res.status(200)
//         .json(new ApiResponse(200, createdUser, "user registered successfully"));
// });

// module.exports = {
//     registerUser
// };
