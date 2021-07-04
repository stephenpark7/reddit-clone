const router = require('express').Router();
const auth = require('../middleware/auth');
const categoryController = require('../controllers/category.controller');

// api/category

router.get('/:categoryName', async (req, res) => {
  await categoryController.getAllPosts(req, res);
});

router.post('/:categoryName', auth, async (req, res) => {
  await categoryController.createPost(req, res);
});

router.get('/:categoryName/:postId', async (req, res) => {
  await categoryController.getPostDataById(req, res);
});

router.post('/:categoryName/:postId', auth, async (req, res) => {
    await categoryController.createPostComment(req, res);
});

module.exports = router;