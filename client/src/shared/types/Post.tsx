import { TUser } from './User';
import { TPostComment } from './PostComment';

export type TPost = {
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
  User: TUser;
  PostComments: Array<TPostComment>;
}