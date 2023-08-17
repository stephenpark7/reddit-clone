import { db } from "../db";
const User = db.User;
import bcrypt from 'bcryptjs';

import validator from 'validator';
import jwt from 'jsonwebtoken';

const jwtSecret: any = process.env.JWT_SECRET;

// Create a new account
const create = async (req: any, res: any) => {
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
  }).then((user: any) => {
    const token = jwt.sign({ user_id: user.user_id }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      user_id: user.user_id,
      username: user.username,
      access_token: token,
    })
  }).catch((err: any) => {
    res.status(400).send('Failed to create an account.');
  });
}

// Log in to account
const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    res.status(400).send('Missing field(s)');
    return;
  }

  // Check if username already in use
  const userData = await User.findOne({ where: { username: username } });
  if (userData === null) {
    res.status(400).send('Username does not exist.');
    return;
  }

  // Check password
  if (await bcrypt.compare(password, userData.password)) {
    const token = jwt.sign({ user_id: userData.user_id }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });
    console.log(token);
    res.status(200).send({
      user_id: userData.user_id,
      username: username,
      access_token: token,
    });
  } else {
    res.status(400).send('Invalid password.');
  }
}

export { create, login };
