import express from 'express';
import { UserRoute } from './user.router';
import { CategoryRoute } from './category.router';

const router = express.Router();

// api/user

router.use('/user', UserRoute);
router.use('/category', CategoryRoute);

export { router };
