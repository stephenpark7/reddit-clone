import express from 'express';
import { create, login } from '../controllers/user.controller';

export const UserRoute = express.Router();

// api/user

UserRoute.post('/signup', async (req: any, res: any) => {
  await create(req, res);
});

UserRoute.post('/login', async (req: any, res: any) => {
  await login(req, res);
});
