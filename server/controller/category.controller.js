const { User } = require('../database');
const db = require('../database');
const Category = db.Category;
const Post = db.Post;

// Get list of posts
exports.getPosts = async (req, res) => {
  const categoryName = req.params.categoryName;
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
      attributes: ['title', 'description', 'views', 'upvotes', 'downvotes', 'createdAt'],
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