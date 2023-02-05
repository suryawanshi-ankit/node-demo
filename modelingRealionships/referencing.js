const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('mongo db is connected...'))
  .catch((err) => console.log('Error', err))

const Course = mongoose.model('Course',new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  })

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  })

  const result = await course.save();
  console.log(result);
}

async function listCourse() {
  const courses = await Course
    .find()
    .populate('author', 'name -_id') // for the refrende autor info
    .select('name author');
  console.log(courses);
}

// createAuthor('Ankit', 'My bio', 'My website');
// createCourse('Node Course', '63dbe8076f372352fd4c4b22');
listCourse()