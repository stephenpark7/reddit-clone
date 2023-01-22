const router = require('express').Router();
const userController = require('../controllers/user.controller');

// api/user

router.post('/signup', async (req, res) => {
  console.log('test');
  await userController.create(req, res);
});

router.post('/login', async (req, res) => {
  await userController.login(req, res);
});

module.exports = router;
