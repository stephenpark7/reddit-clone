import { db } from "../db";

const { User, Category, Post, PostComment } = db;

// Get all posts
const getAllPosts = async (req: any, res: any) => {
  const { categoryName } = req.params;
  if (!categoryName) return;
  try {
    const categoryData = await Category.findOne({
      where: {
        name: categoryName
      },
    });

    if (!categoryData) {
      res.status(400).send('Category does not exist.');
      return;
    }

    const postData = await Post.findAll({
      attributes: ['post_id', 'type', 'title', 'content', 'upvotes', 'downvotes', 'createdAt'],
      where: { category_id: categoryData.category_id },
      include: [
        { model: User, attributes: ['username'] },
        { model: PostComment, attributes: ['comment_id'] }
      ],
      order: [
        ['createdAt', 'DESC']
      ],
    });

    res.status(200).json({ 
      category_id: categoryData.category_id,
      posts: postData
    });
  } catch (err) {
    res.status(400).send('Failed to get posts.');
  }
}

// Create a post
const createPost = async (req: any, res: any) => {
  try {
    const { category_id, type, title, content } = req.query;
    if (!category_id || !type || !title || !content) {
      res.status(400).send('Missing parameter(s).');
      return;
    }
    const post = await Post.create({
      user_id: req.userId,
      category_id: category_id,
      type: type,
      title: title,
      content: content,
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).send('Failed to create an post.');
  }
}

// Create a post comment
const createPostComment = async (req: any, res: any) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    if (!postId || !content) {
      res.status(200).send('Missing parameter(s).');
      return;
    }
    const userData = await User.findOne({ where: { user_id: req.userId } });
    let postComment = PostComment.build({
      post_id: postId,
      user_id: req.userId,
      content: content,
    });
    postComment.dataValues.User = userData;
    await postComment.save();
    res.status(200).json(postComment);
  } catch (err) {
    res.status(400).send('Failed to create a post comment.');
  }
}

// Get post data (content, title, upvotes, downvotes, comments, etc.)
const getPostDataById = async (req: { params: { postId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: any): void; new(): any; }; }; }) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      res.status(200).send('Missing parameter(s).');
      return;
    }
    let post = await Post.findOne({
      attributes: ['type', 'title', 'content', 'upvotes', 'downvotes', 'createdAt'],
      where: { post_id: postId },
      include: [
        { model: User, attributes: ['username'] },
      ],
      raw: true,
      nest: true,
    });
    const PostComments = await PostComment.findAll({
      attributes: ['comment_id', 'content', 'createdAt'],
      where: { post_id: postId },
      include: [
        { model: User, attributes: ['username'] },
      ],
      order: [['createdAt', 'DESC']]
    });
    post.PostComments = PostComments;
    res.status(200).json(post);
  } catch (err) {
    res.status(400).send('Failed to get a post.');
  }
}

export { getAllPosts, createPost, createPostComment, getPostDataById };
