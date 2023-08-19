import express from 'express';
import { getAllPosts, createPost, createPostComment, getPostDataById, getCategories } from '../controllers/category.controller';
import { auth } from '../middleware/auth.middleware';

export const CategoryRoute = express.Router();

// api/category

CategoryRoute.get('/', async (req: any, res: any) => {
  await getCategories(req, res);
});

CategoryRoute.get('/:categoryName', async (req: any, res: any) => {
  await getAllPosts(req, res);
});

CategoryRoute.post('/:categoryName', auth, async (req: any, res: any) => {
  await createPost(req, res);
});

CategoryRoute.get('/:categoryName/:postId', async (req: any, res: any) => {
  await getPostDataById(req, res);
});

CategoryRoute.post('/:categoryName/:postId', auth, async (req: any, res: any) => {
    await createPostComment(req, res);
});
