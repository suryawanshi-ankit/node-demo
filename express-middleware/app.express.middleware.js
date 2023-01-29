// middleware is a function that takes a req object  either passes response to client or passes control to another middleware.

const startDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const logger = require('./logger');
const auth = require('./authantication');
const app = express();

//configuration
console.log('app name:', config.get('name'));
console.log('app mail host:', config.get('mail.host'));
// console.log('app password:', config.get('mail.password')); //giving some error for now.

//EXAMPLE - 1 
//express.json() is a function return a middleware function.
//job of this middleware is to read the request and if threre is json object in body of req it will pares the body of req  into a json object.

app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value this will pare and change it to req.body
app.use(express.static('public')); // to use static this in file

// to enable in development envorment only this middleware
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan is enabled...', app.get('env'));
  startDebugger('Morgan is enabled...', app.get('env'))
}

// THIS IS CUSTOM MIDDLEWAR
app.use(logger);

// THIS IS CUSTOM MIDDLEWAR
app.use(auth)

//EXAMPLE - 2
app.get('/', 
// below fnction is example of middleware
//takes req object and return response to client, so it's teminate req and res cycle. 
(req, res) => {
  res.send('hello world using express.js!!!');
}
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!!!`));
 