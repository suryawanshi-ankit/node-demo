const number = require('joi/lib/types/number');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('mongo db connected'))
  .catch((err) => console.log('error in connecting', err));

// build in validations
// required, minlength, maxlength, match, enum, min, max



const Exercise2Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
     
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true, // convet the string in lowercase
    uppercase: true, // convet the string in uppercase
    trim: true // remove the space from around
  },
  author: String,
  tags: {
    type: [String],
    // we can define a custom validation like this.
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag.'
    },

  },
  date: { type: Date, default: Date.now()},
  isPublished: Boolean,
  price: Number,
  // condition validation if course is published then only price is required.
  // in this case we can't use array function as it will not provide this for object.
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 80,
    max: 1600,
    get: (v) => Math.round(v), // to round the value
    set: (v) => Math.round(v) // to round the value
  }, 
})

const Exercise2 = mongoose.model('Exercise2', Exercise2Schema);

async function addCourse() {
  const course = new Exercise2({
    name: 'React Course',
    category: 'WEB',
    author: 'Ankit-1',
    tags: ['frontend'],
    isPublished: true,
    price: 900.99
  })

  try {
    const result = await course.save();
    console.log(result);

    // await course.validate(); // it will give the error is validation is not true.
    
  } catch (error) {
    console.log(error.message);

    // when you need to know about each validation error
    // for (field in error.errors)
    //   console.log(error.errors[field]);
  }

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

// getCourse();
addCourse();