'use strict';

const { request, response } = require('express');
const { userModel } = require('../models/User.model');

const getBooks = (request, response) => {
  const { email } = request.query;
  userModel.findOne({ email: email }, (error, user) => {
    console.log(user);
    if (error) {
      response.send(error.message);
    } else {
      response.json(user);
    }
  });
};
const createBook = (request, response) => {
  //we need to find the email of the person and thhe to add to that person
  console.log(request.body);
  const { userEmail, bookName, desc, status } = request.body;
  userModel.findOne({ email: userEmail }, (error, userData) => {
    if (error) {
      response.send(error);
    } else {
      //here we are going to add the new cat
      console.log(userData);
      userData.books.push({
        name: bookName,
        description: desc,
        status: status,
      });
      userData.save();
      response.json(userData);
    }
  });
};

const updateBook = (request, response) => {
  console.log(request.params);
  const bookIndex = request.params.book_idx;
  const { userEmail, bookName, desc, status } = request.body;
  userModel.findOne({ email: userEmail }, (error, userData) => {
    if (error) {
      response.send(error);
    } else {
      userData.books.splice(bookIndex, 1, {
        name: bookName,
        description: desc,
        status: status,
      });
      console.log(userData);
      userData.save();
      response.send(userData);
    }
  });
};

const deleteBook = (request, response) => {
  console.log(request.params);
  const bookIndex = request.params.book_idx;
  const { userEmail } = request.body;
  userModel.findOne({ email: userEmail }, (error, userData) => {
    if (error) {
      response.send(error);
    } else {
      userData.books.splice(bookIndex, 1);
      console.log(userData);
      userData.save();
      response.send(userData);
    }
  });
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
