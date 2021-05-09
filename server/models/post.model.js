module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', {
    post_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
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