const mongoose = require('mongoose');
const Student = require('./models/studentSchema'); // Update the path

mongoose.connect('mongodb+srv://nithinkodam69:nithin1kmongodb@cluster0.pamoj.mongodb.net/kalamdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyStudents = [];

const genders = ['Male', 'Female', 'Other'];
const centres = ['Hyderabad', 'Delhi', 'Bangalore'];
const classes = ['2nd', '3rd', '4th', '5th'];
const flags = ['yes', 'no'];
const skillsPool = [
  'know abcd', 
  'know numbers',
  'know both abcd and numbers',
  'can read',
  'can write'
];

for (let i = 1; i <= 40; i++) {
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  const randomCentre = centres[Math.floor(Math.random() * centres.length)];
  const randomClass = classes[Math.floor(Math.random() * classes.length)];
  const randomFlag = flags[Math.floor(Math.random() * flags.length)];
  const randomSkills = skillsPool
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);

  const attendance = [];
  const marks = [];

  // ➤ Attendance for the past 60 days (2 months)
  for (let j = 0; j < 60; j++) {
    const day = new Date();
    day.setDate(day.getDate() - j);
    attendance.push({
      date: new Date(day),
      status: Math.random() > 0.2 ? 'present' : 'absent',
    });
  }

  // ➤ Only 5 assessments
  for (let k = 0; k < 5; k++) {
    const day = new Date();
    day.setDate(day.getDate() - (k * 10)); // Spread over time
    marks.push({
      assessment: `Assessment ${k + 1}`,
      date: new Date(day),
      marks: Math.floor(Math.random() * 50) + 50, // 50 to 99
    });
  }

  dummyStudents.push({
    name: `Student ${i}`,
    photo: '',
    age: Math.floor(Math.random() * 3) + 7, // Age 7 to 9
    gender: randomGender,
    centre: randomCentre,
    ex_skills: randomSkills,
    address: `Address ${i}, Some City`,
    class: randomClass,
    fathername: `Father ${i}`,
    flagged: randomFlag,
    attendance,
    marks
  });
}

// Insert into MongoDB
Student.insertMany(dummyStudents)
  .then(() => {
    console.log('Inserted 40 dummy student records ✅');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting data ❌:', err);
    mongoose.connection.close();
  });
