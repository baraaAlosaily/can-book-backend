'use strict';
const mongoose = require('mongoose');
const BookSchema = require('./Book.model');

const UserSchema = new mongoose.Schema({
  email: { type: String },
  books: [BookSchema],
});

const userModel = mongoose.model('users', UserSchema);

const seedUser = () => {
  const newUser = new userModel({
    email: 'seelbaraa@gmail.com',
    books: [
      {
        name: 'Forget the Alamo',
        description: ' The Rise and Fall of an American Myth',
        status: 'New',
      },
      {
        name: 'The Other Black Girl',
        description:
          'The Other Black Girl is a 2021 novel by Zakiya Dalila Harris',
        status: 'New',
      },
      {
        name: 'We Were Not Men',
        description:
          'A novel that punches you in the heart: the powerful, unbearably moving and ultimately uplifting story of twin brothers',
        status: 'Old',
      },
    ],
  });
  console.log(newUser);
  newUser.save();
};
seedUser();
module.exports = { userModel, seedUser };
