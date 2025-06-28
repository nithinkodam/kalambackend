const mongoose = require('mongoose');
const { Schema } = mongoose;

const volunteerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  centre: {
    type: String,
    required: true
  },
  qualification: {
    type: [String], // Array of skills
    default: []
  },
  address: {
    type: String,
    required: true
  },
  volunteerDuration: {
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  }
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
