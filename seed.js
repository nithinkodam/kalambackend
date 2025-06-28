const mongoose = require('mongoose');
const Student = require('./models/studentSchema'); // Adjust path

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
  'know abcd', 'know numbers',
  'know both abcd and numbers',
  'can read', 'can write'
];

(async () => {
  for (let i = 0; i < 40; i++) {
    const name = `Student ${i + 1}`;

    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomCentre = centres[Math.floor(Math.random() * centres.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
    const randomSkills = skillsPool
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const attendance = [];
    const marks = [];

    for (let j = 0; j < 60; j++) {
      const day = new Date();
      day.setDate(day.getDate() - j);
      const presenceRate = 0.6 + (Math.sin(i + j * 0.2) * 0.2);
      attendance.push({
        date: new Date(day),
        status: Math.random() < presenceRate ? 'present' : 'absent',
      });
    }

    for (let k = 0; k < 5; k++) {
      const day = new Date();
      day.setDate(day.getDate() - (k * 10));
      const base = 60 + ((i + k) % 20);
      const noise = Math.floor(Math.random() * 21) - 10;
      const finalMarks = Math.max(40, Math.min(100, base + noise));
      marks.push({
        assessment: `Assessment ${k + 1}`,
        date: new Date(day),
        marks: finalMarks
      });
    }

    dummyStudents.push(new Student({
      name,
      password: name, // Raw password will be hashed by pre-save
      photo: '',
      age: Math.floor(Math.random() * 3) + 7,
      gender: randomGender,
      centre: randomCentre,
      ex_skills: randomSkills,
      address: `Address ${i + 1}, Some City`,
      class: randomClass,
      fathername: `Father ${i + 1}`,
      flagged: randomFlag,
      attendance,
      marks
    }));
  }

  // Save all students
  for (let student of dummyStudents) {
    await student.save();
  }

  console.log('✅ Inserted 40 students with name-based passwords (hashed using secret)');
  mongoose.connection.close();
})();
