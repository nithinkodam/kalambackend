const mongoose = require('mongoose');
const Tutor = require('./models/tutorSchema'); // adjust path if needed

mongoose.connect('mongodb+srv://nithinkodam69:nithin1kmongodb@cluster0.pamoj.mongodb.net/kalamdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyTutors = [];

const names = ['Ravi', 'Anita', 'John', 'Meera', 'Kiran'];
const genders = ['Male', 'Female', 'Other'];
const centres = ['Hyderabad', 'Delhi', 'Bangalore'];
const classOptions = ['2', '3', '4', '5'];
const qualificationsPool = [
  ['B.Ed'], ['M.Ed', 'B.Sc'], ['B.A'], ['M.Sc'], ['PhD', 'B.Ed']
];
const addresses = [
  '123 Main St', 'Green Colony', 'Sector 5', 'MG Road', 'Hill View'
];

(async () => {
  for (let i = 0; i < 5; i++) {
    const tutor = new Tutor({
      name: names[i],
      photo: '', // add base64 or URL if needed
      age: Math.floor(Math.random() * 15) + 25, // age between 25–40
      gender: genders[Math.floor(Math.random() * genders.length)],
      centre: centres[Math.floor(Math.random() * centres.length)],
      class: classOptions.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
      qualification: qualificationsPool[i],
      address: addresses[i]
    });

    dummyTutors.push(tutor);
  }

  for (let tutor of dummyTutors) {
    await tutor.save();
  }

  console.log('✅ Inserted 5 random tutors into MongoDB');
  mongoose.connection.close();
})();
