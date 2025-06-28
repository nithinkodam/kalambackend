const mongoose = require('mongoose');
const { Schema } = mongoose;

const tutorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String, // Assuming base64 string or image URL
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
  class:{
    type: String,
    required:true
  },
  qualification:{
    type: [String],
    required:true
  },
  address: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
