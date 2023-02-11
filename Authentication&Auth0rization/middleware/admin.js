const jwt = require('jsonwebtoken');
const config = require('config');

// 401 Unauthorized
// 403 Forbidden

function admin(req, res, next) {
  // const token = req.header('x-auth-token');
  // if (!token) 
  //   return res.status(401).send('Access denied. No token provided.');

  // try {
  //   // verify JWT and decode - if flase throw exception,
  //   // after docode we get what we used in payload.
  //   const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
  //   req.user = decoded;
  //   next();
  // } catch (ex) {
  //   res.status(401).send('Access denied. Invalid Token');
  // }

  if (!req.user.isAdmin) return res.status(403).send("Access denied!!!");
  next();

}

module.exports = admin;
