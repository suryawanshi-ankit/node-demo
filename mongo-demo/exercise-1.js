const func = require('joi/lib/types/func');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Mongo db is connected'))
  .catch((err) => console.log('Error in connecting mongo db', err));


const exercise1Schema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now()},
  isPublished: Boolean,
})

const Exercise1 = mongoose.model('Exercise1', exercise1Schema);

async function addCourse() {
  console.log('adding course');
  const exercise = new Exercise1({
    name: 'Aspnet Course',
    author: 'Ankit-4',
    tags: ['aspnet', 'backend'],
    isPublished: true,
  });

  const result = await exercise.save();
  console.log('result', result);
}

// find published backend course and sort by name in asc and show only name, author

async function getCourse() {
  const listCourse = await Exercise1
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1});
  console.log('listCourse', listCourse);
}

// addCourse();
getCourse();


