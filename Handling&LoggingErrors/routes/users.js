const { User, validate} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const router = express.Router();

router.get('/me',auth, asyncMiddleware(async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
}));

router.post('/', asyncMiddleware(async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email, 
  //   password: req.body.password
  // });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email'])); // to pick specific field from the object
}));


// this function we be like facory function we will pass a function and get a new function.
// so we need to return a route handler function
// async function asyncMiddleware(handler) {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (ex) {
//       next(ex);
//     }
//   }
// }

//as we need to sparete the try catch login so we can keep it common
//and use that in all routes.

// router.get('/', auth, async(req, res) => {
//   // here we are using try and catch to handle exeptions
//   // problem here is we need to use this try and cantch in every route handler
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (ex) {
//     // res.send(500).send('Internal server Error');
//     // commented here as it's used in index.js
//     // go and check in index.js

//     next(ex);
//   }
// });

router.get('/', auth, asyncMiddleware(async(req, res) => {
 
  // to show demonstrad of wisdom uncomment line: 71 and line 12 in error.js.
  // throw new Error('error from wisdom');
  const users = await User.find();
  res.send(users);
}));



router.delete('/:id',[auth, admin], asyncMiddleware(async (req, res) => {
  const users = await User.findByIdAndRemove(req.params.id);
  if (!users) return res.status(404).send('The customer with the given id is not found');
  res.send(users);
}));

module.exports = router;
