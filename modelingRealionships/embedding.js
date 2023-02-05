const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('mongo db is connected...'))
  .catch((err) => console.log('Error', err))

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course',new mongoose.Schema({
  name: String,
  author: authorSchema
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

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = "Ankit suryawanshi";
  // const res = await course.save();

  const result = await Course.updateOne({_id: courseId}, {
    $set: {
      'author.name': 'John Smith'
    }
  })
  console.log(result);
}

// createCourse('Node Course', new Author({ name: 'Ankit' }));
// updateAuthor('63dbf020123325c0b4490529');
listCourse()