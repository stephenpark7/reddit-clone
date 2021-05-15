import { User } from './User';

export interface Post {
  post_id: string;
  user_id: number;
  category_id: number;
  type: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  User: User;
}