const { User } = require('../database');
const db = require('../database');
const Category = db.Category;
const Post = db.Post;

// Get list of posts
exports.getPosts = async (req, res) => {
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
      where: {
        category_id: categoryData.category_id
      },
      include: [{
        model: User,
        attributes: ['username'],
      }],
      order: [
        ['post_id', 'DESC']
      ],
    });
    
    res.status(200).json(postData);
  } catch(err) {
    res.status(400).send('Failed to get tweets.');
  }
}

// Create a post
exports.createPost = async (req, res) => {
  const { categoryName } = req.params;
  if (!categoryName) return;
  try {
    const { type, title, content, category_id } = req.query;
    if (!type || !title || !content || !category_id) {
      res.status(200).send("Missing parameter(s).");
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
  } catch(err) {
    res.status(400).send('Failed to create an post.');
  }
} 