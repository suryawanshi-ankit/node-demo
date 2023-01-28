//express is framwork for building restful api's
//it's give structure for creating diffrent routes
//

// used for validation.
const Joi = require('joi');

const express = require('express');
const { result } = require('underscore');
const app = express();


//this needs to enable parsing of json object in body of req.
//by default it's not enable.

app.use(express.json());

// app.get()
// app.post()
// app.put()
// app.delete()

let courses = [
  {id: 1, name: 'HTML'},
  {id: 2, name: 'CSS'},
  {id: 3, name: 'JS'},
  {id: 4, name: 'REACT'},
  {id: 5, name: 'NODE'},
  {id: 6, name: 'EXPRESS'},
]

app.get('/', (req, res) => {
  res.send('hello world using express.js!!!');
});

//only for learning now using array of number
app.get('/api/courses', (req, res) => {
  res.send(JSON.stringify(courses));
});

//route parameters and handling http get request
app.get('/api/courses/:id', (req, res) => {
  const result = courses.find(c => c.id === parseInt(req.params.id));
  if (!result)
  return res.status(404).send('This course in not available');
  res.send(result); 
});

//route for muliple parameters
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params.month);
  res.send(req.params.year);

  //here the fisrt line will be return
});

//route for query string
app.get('/api/posts/query', (req, res) => {
  res.send(req.query); 
})

// handling http post request
app.post('/api/courses', (req, res) => {

  const schema = {
    name: Joi.string().min(3).required()
  }

   const validationRes = Joi.validate(req.body, schema);
   console.log(validationRes);

   if(validationRes.error) {
    res.status(400).send(validationRes.error.details[0].message);
    return; 
   }

  // validation logic
  // if (!req.body.name || req.body.name.length < 3) {
  //   //400 Bad request
  //   res.status(400).send('name is not correct');
  //   return;
  // }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course); 
  res.send(course);
});


//handleing http PUT request
app.put('/api/courses/:id', (req, res) => {

  // look up the course
  //if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!result) 
    return res.status(404).send('This course in not available');

  // validate
  //if invalid, return 400 - Bad request
  const schema = {
    name: Joi.string().min(3).required()
  }

   const validationRes = Joi.validate(req.body, schema);
   console.log(validationRes);

   if(validationRes.error) {
    res.status(400).send(validationRes.error.details[0].message);
    return; 
   }

   //update course
   //return the updated course
   course.name = req.body.name;
   res.send(course); 
})

app.delete('/api/courses/:id', (req, res) => {

  // look up the course
  //if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('This course in not available');

  //delte
  //return the same course

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
   

})

// app.listen(3000, () => console.log('Listening on port 3000!!!'));

//in prodection is not neccessary application will run on Port 3000 that's why we use env.
// you have to set port in terminal using export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!!!`));

