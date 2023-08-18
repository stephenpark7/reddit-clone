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
  PostComments: Array<PostComment>;
}
