const db = require('../models');
const User = db.User;
const bcrypt = require("bcryptjs");
const validator = require('validator');

// const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWT_SECRET;

// Create a new account
exports.create = async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    res.status(400).send('Missing field(s)');
    return;
  }

  // Username validation
  if (!validator.isAlphanumeric(username)) {
    res.status(400).send('Username must contain only alphanumeric characters.');
    return;
  }

  // Check if username already in use
  const userData = await User.findOne({ where: { username: username } });
  if (userData !== null) {
    res.status(400).send('Username already in use.');
    return;
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to database
  User.create({
    username: username,
    password: hashedPassword,
  }).then(user => {
    // console.log(user);
    res.status(200).send('Successfully created an account.');
  }).catch(err => {
    // console.log(err);
    res.status(400).send('Failed to create an account.');
  });
}