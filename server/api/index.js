const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/signup', async (req, res) => {
  await userController.create(req, res);
});

// router.post('/login', async (req, res) => {
//   await userController.login(req, res);
// });

module.exports = router;