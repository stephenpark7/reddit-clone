const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {}, //removed ssl
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./models/user.model")(sequelize, Sequelize);
db.Post = require("./models/post.model")(sequelize, Sequelize);
db.PostComment = require("./models/post-comment.model")(sequelize, Sequelize);
db.Category = require("./models/category.model")(sequelize, Sequelize);

db.User.hasMany(db.Post, { foreignKey: "user_id" });
db.Post.belongsTo(db.User, { foreignKey: "user_id" });

db.Category.hasMany(db.Post, { foreignKey: "category_id" });
db.Post.belongsTo(db.Category, { foreignKey: "category_id" });

db.Post.hasMany(db.PostComment, { foreignKey: "post_id" });
db.PostComment.belongsTo(db.Post, { foreignKey: "post_id" });

db.User.hasMany(db.PostComment, { foreignKey: "user_id" });
db.PostComment.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;

const events = [
  {name: "beforeExit", exitCode: 0 },
  {name: "uncaughtExecption", exitCode: 1 },
  {name: "SIGINT", exitCode: 130 },
  {name: "SIGTERM", exitCode: 143 }
];

events.forEach(e => {
  process.on(e.name, () => {
    sequelize.connectionManager.close()
      .then(() => { 
        console.log("connection cleaned");
        process.exit(e.exitCode) ;
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
});
