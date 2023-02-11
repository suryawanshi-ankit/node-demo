const winston = require('winston');

module.exports = function(err, req, res, next) {

  // log the exception
  //to show example of winston
  //there is errore, warn, info, verbose, debug, silly

  // winston.log('error', err.message);
  //may be use helper methods
  //uncomment below line to show wiston error and line 71 in users.js
  //winston.log(err.message, err);

  res.status(500).send('Somthing failed.');

}
