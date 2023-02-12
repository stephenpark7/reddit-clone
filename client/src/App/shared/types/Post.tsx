import { User } from './User';
import { PostComment } from './PostComment';

export type Post = {
  content: string;
  createdAt: string;
  downvotes: number;
  post_id: string;
  title: string;
  type: string;
  upvotes: number;

  user_id?: number;
  category_id?: number;
  updatedAt?: string;
  User?: User;
  PostComments: Array<PostComment>;
}
