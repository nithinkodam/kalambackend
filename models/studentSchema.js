const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const SECRET_KEY = 'Flash_Barry';

const attendanceSchema = new Schema({
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], required: true }
}, { _id: false });

const marksSchema = new Schema({
  assessment: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  marks: { type: Number, required: true }
});

const studentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  centre: { type: String, required: true },
  ex_skills: { type: [String], default: [] },
  address: { type: String, required: true },
  class: { type: String, required: true },
  fathername: { type: String, required: true },
  flagged: { type: String, required: true },
  attendance: { type: [attendanceSchema], default: [] },
  marks: { type: [marksSchema], default: [] }
}, { timestamps: true });

// 🔐 Hash password before save using name + SECRET_KEY
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // ✅ use actual password
  next();
});


module.exports = mongoose.model('Student', studentSchema);
