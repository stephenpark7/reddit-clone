const express = require('express');
const router = express.Router();
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const auth = require('./middleware/auth');

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

router.post('/category/:categoryName/:postId/comments', auth, async (req, res) => {
  await categoryController.createPostComment(req, res);
});

router.get('/category/:categoryName/:postId', async (req, res) => {
  await categoryController.getPost(req, res);
});

module.exports = router;