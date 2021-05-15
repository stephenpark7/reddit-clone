const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  await userController.create(req, res);
});

router.post('/login', async (req, res) => {
  await userController.login(req, res);
});

router.get('/category/:categoryName', async (req, res) => {
  await categoryController.getPosts(req, res);
});

router.post('/category/:categoryName', auth, async (req, res) => {
  await categoryController.createPost(req, res);
});

module.exports = router;