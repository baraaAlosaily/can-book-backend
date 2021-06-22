'use strict';

const userModel = require('../models/User.model');

const getBooks = (request, response) => {
  const { email } = request.query;
  userModel.find({ email: email }, (error, user) => {
    console.log(user);
    if (error) {
      response.send(error.message);
    } else {
      response.json(user);
    }
  });
};

module.exports = getBooks;
