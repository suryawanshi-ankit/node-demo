const users = require('./routes/users');  
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const config = require('config');
const customers = require('./routes/customers');

const app = express();

//set in terminal with thi commond
//export jwtPrivateKey="Key_Name_Here"
if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log('Could not connect to mongoDB', err));

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!!!`));

