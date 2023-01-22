import { User } from './User';
import { PostComment } from './PostComment';

export type Post = {
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
  PostComments: Array<PostComment>;
}
