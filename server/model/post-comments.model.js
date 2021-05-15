module.exports = (sequelize, Sequelize) => {
  const PostComments = sequelize.define('PostComments', {
    comment_id: {
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
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });
  
  return Category;
}