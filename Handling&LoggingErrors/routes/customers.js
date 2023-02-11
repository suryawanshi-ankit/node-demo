const { Customers, validate } = require('../models/user');
const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');

const router = express.Router();

router.post('/',auth, asyncMiddleware(async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  customers = new Customers(_.pick(req.body, ['firstName', 'email', 'lastName', 'mobile']));
  const customers = await customers.save();
  res.send(customers);
}));

module.exports = router;
