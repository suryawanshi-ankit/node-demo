const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Could not connect to mongoDB', err));

// Schema
const cousrseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now()},
  isPublished: Boolean,
})

const Course = mongoose.model('Course', cousrseSchema);
async function createCourse() {
  // Course - collection name & cousrseSchema - defines structure of document in this collection.
  const course = new Course({
    name: 'Angular Course',
    author: 'Ankit',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });
  
  //saving in database
  const result = await course.save();
  console.log('result', result);
}

// when need to create a new document 
// createCourse();


//  ###Comparison Operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// not in (not in)

// it can be use like
// .find({price: { $gte: 10, $lte: 20}})
// .find({price: { $in: [10, 15, 20]}})

// ### Logical Operators
// .find()
// .or([{ author: 'Most' }, { isPublished: true }])
// .and([{ author: 'Most' }, { isPublished: true }])

// ### Pagination
// .find()
// .skip((pageNumber - 1) * pageSize)
// .limit(pageSize)

// query the database
async function getCourses() {
  const courses = await Course.find();

  // apply filter on query
  // const courses = await Course
  //   .find({name: 'Angular Course', isPublished: true}) // find with filtration
  //   .limit(10) // limit the document
  //   .sort({ name: 1}) // sort by the provided key
  //   .select({name: 1, tags: 1}) // only give the mention keys
  //   .count(); // number od ducument as result

  console.log(courses);
}
// getCourses();

async function updateCourse(id) {
  // Approch - Query First

  // const course = await Course.findById(id);
  // if (!course) return;
  // course.isPublished = true;
  // course.author = 'New Auther';
  // course.set({
  //   isPublished: false,
  //   author: 'Ankit'
  // })
  // const result = await course.save();
  // console.log(result);

  // Approch - Update First 
  // const result = await Course.update({_id: id}, {
  //   $set: {
  //     author: "New author",
  //     isPublished: true,
  //   }
  // });

  // to get the updated object after update is done
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "Jack",
      isPublished: false,
    }
  },
  // {new: true} // to get data after update otherwise by default it will send old data
  );
  console.log(result);
}

// updateCourse('63d9ce843c1a5fcbf0e44175');

async function removeCourse(id) {
  // const result = await Course.deleteOne({_id: id});

  // to get the updated object after update is done
  const result = await Course.findByIdAndDelete(id);
  console.log(result);
}

// removeCourse('63d9ce439e16f1afbd17b9c8');

