const number = require('joi/lib/types/number');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('mongo db connected'))
  .catch((err) => console.log('error in connecting', err));


const Exercise2Schema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now()},
  isPublished: Boolean,
  price: Number,
})

const Exercise2 = mongoose.model('Exercise2', Exercise2Schema);

async function addCourse() {
  const course = new Exercise2({
    name: 'React Course',
    author: 'Ankit-1',
    tags: ['react', 'frontend'],
    isPublished: false,
    price: 900
  })

  const result = await course.save();
  console.log(result);
}

// to find a course which is published, having prcie greater or equal to 600 and name contains string 'net'
// needs to select only name, author, price

async function getCourse() {
  const result = await Exercise2
    .find({isPublished: true})
.or([ { price: {$gte : 600} }, {name: {$in: /.*net.*/i}}]) // after uncommenting this remove tage part from line number 34.
    .sort('-price')
    .select({name: 1, author: 1, price: 1});

  console.log('result', result);
}

getCourse();
// addCourse();