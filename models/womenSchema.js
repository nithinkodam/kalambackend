const mongoose = require('mongoose');
const { Schema } = mongoose;


const attendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
}, { _id: false });


const studentSchema = new Schema({
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
  address: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  attendance: {
    type: [attendanceSchema],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
