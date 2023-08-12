import { User } from './User';
import { PostComment } from './PostComment';

export type Post = {
  post_id: string;
  type: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;

  User?: User;
  // user_id?: number;
  // category_id?: number;
  // updatedAt?: string;
  PostComments: Array<PostComment>;
}
