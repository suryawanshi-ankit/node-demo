const { User, validate} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/me',auth, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async(req, res) => {
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

  // res.send(_.pick(user, ['name', 'email'])); // to pick specific field from the object

  // will return token in header of response
  // const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey')); // creating a jwt token

  // to make the token generation common we sholuld use it like this.
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email'])); // to pick specific field from the object
});

router.get('/', auth, async(req, res) => {
  const users = await User.find();
  res.send(users);
});

router.delete('/:id',[auth, admin], async (req, res) => {
  const users = await User.findByIdAndRemove(req.params.id);
  if (!users) return res.status(404).send('The customer with the given id is not found');
  res.send(users);
});

module.exports = router;
