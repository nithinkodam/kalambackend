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


const marksSchema = new Schema({
  assessment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  marks: {
    type: Number,
    required: true
  }
})


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
  ex_skills: {
    type: [String], // Array of skills
    default: []
  },
  address: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  fathername: {
    type: String,
    required: true
  },
  flagged: {
    type: String,
    required: true
  },
  attendance: {
    type: [attendanceSchema],
    default: []
  },
  marks: {
    type: [marksSchema],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
