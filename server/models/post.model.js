module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', {
    post_id: {
      type: Sequelize.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    upvotes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downvotes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    freezeTableName: true,
  });
  
  return Post;
}
