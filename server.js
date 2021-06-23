const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(cors());
//this method is usd to decode our body sent by the post or put methods
app.use(express.json());

const PORT = process.env.PORT;

const seedUser = require('./models/User.model');
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require('./controllers/User.controller');

mongoose.connect('mongodb://localhost:27017/FavourateBooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// seedUser();

// a server endpoint
app.get(
  '/', // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send('Hello World'); // our endpoint function response
  }
);
//read rout get all cat by user email
app.get('/books', getBooks);
// Create rout, which will send new book to be added for the user
app.post('/book', createBook);
//update soute, will receive the cat id that we want to update, and its info in the body payload
app.put('/book/:book_idx', updateBook);
//Delete route,which will dete the cat by its index
app.delete('/book/:book_idx', deleteBook);
app.listen(PORT); // kick start the express server to work
