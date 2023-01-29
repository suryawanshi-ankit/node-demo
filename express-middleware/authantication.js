function auth(req, res, next) {
  console.log('authantication...');
  next();
}

module.exports = auth;
