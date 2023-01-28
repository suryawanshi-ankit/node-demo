// using plan http to create server and routes.

const http = require('http');

// this approch is not maintable as more route comes we need to add more if blocks.
// so that's why we need to use framwork, Ex- express.

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello world');
    res.end();
  }

  //only for learning now using array of number
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }
})

server.listen(3000);

console.log('Listening on port 3000...')