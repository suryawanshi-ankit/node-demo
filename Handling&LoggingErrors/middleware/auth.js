const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) 
    return res.status(401).send('Access denied. No token provided.');

  try {
    // verify JWT and decode - if flase throw exception,
    // after docode we get what we used in payload.
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send('Access denied. Invalid Token');
  }

}

module.exports = auth;
