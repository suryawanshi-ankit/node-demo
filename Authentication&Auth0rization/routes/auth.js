const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey')); // creating a jwt token

  // to make the token generation common we sholuld use it like this.
  const token = user.generateAuthToken();

  res.send(token); // return to body
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  }
  return Joi.validate(req, schema);
}

module.exports = router;
