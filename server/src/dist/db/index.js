"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const index_model_1 = require("../models/index.model");
const sequelize_1 = require("sequelize");
const env = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
};
const sequelize = new sequelize_1.Sequelize(env.dbName, env.dbUser, env.dbPass, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {},
    pool: {
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false
});
const user = (0, index_model_1.User)(sequelize, sequelize_1.Sequelize);
const category = (0, index_model_1.Category)(sequelize, sequelize_1.Sequelize);
const post = (0, index_model_1.Post)(sequelize, sequelize_1.Sequelize);
const postComment = (0, index_model_1.PostComment)(sequelize, sequelize_1.Sequelize);
// setup associations
user.hasMany(post, { foreignKey: 'user_id' });
post.belongsTo(user, { foreignKey: 'user_id' });
category.hasMany(post, { foreignKey: 'category_id' });
post.belongsTo(category, { foreignKey: 'category_id' });
post.hasMany(postComment, { foreignKey: 'post_id' });
postComment.belongsTo(post, { foreignKey: 'post_id' });
user.hasMany(postComment, { foreignKey: 'user_id' });
postComment.belongsTo(user, { foreignKey: 'user_id' });
exports.db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: sequelize,
    User: user,
    Category: category,
    Post: post,
    PostComment: postComment,
};
//
const events = [
    { name: 'beforeExit', exitCode: 0 },
    { name: 'uncaughtExecption', exitCode: 1 },
    { name: 'SIGINT', exitCode: 130 },
    { name: 'SIGTERM', exitCode: 143 }
];
events.forEach(e => {
    process.on(e.name, () => {
        sequelize.connectionManager.close()
            .then(() => {
            console.log('connection cleaned');
            process.exit(e.exitCode);
        })
            .catch((err) => {
            console.error(err);
            process.exit(1);
        });
    });
});
