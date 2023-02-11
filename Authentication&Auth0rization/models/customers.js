const Joi = require('joi');
const mongoose = require('mongoose');
const func = require('joi/lib/types/func');
const config = require('config');
const jwt = require('jsonwebtoken');

const customersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  mobile: {
    type: Number,
    required: true,
    length: 10,
  },
  
});

const Customers = mongoose.model('User', customersSchema);

function validateCustomers(customers) {
  const schema = {
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    mobile: Joi.number().length().required(),
  }
  return Joi.validate(customers, schema);
}

exports.Customers = Customers;
exports.validate = validateCustomers;

