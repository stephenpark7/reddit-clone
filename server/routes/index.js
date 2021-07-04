const router = require('express').Router();
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

// api/user

router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router;