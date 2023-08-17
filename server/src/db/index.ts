import { 
  User, 
  Category, 
  Post, 
  PostComment 
} from '../models/index.model';

import { Sequelize } from 'sequelize';

const env = {
  dbName: (process.env.DB_NAME as string),
  dbUser: (process.env.DB_USER as string),
  dbPass: (process.env.DB_PASS as string),
}

const sequelize = new Sequelize(env.dbName, env.dbUser, env.dbPass, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {}, //removed ssl
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false
});

const user = User(sequelize, Sequelize);
const category = Category(sequelize, Sequelize);
const post = Post(sequelize, Sequelize);
const postComment = PostComment(sequelize, Sequelize);

// setup associations

user.hasMany(post, { foreignKey: 'user_id' });
post.belongsTo(user, { foreignKey: 'user_id' });

category.hasMany(post, { foreignKey: 'category_id' });
post.belongsTo(category, { foreignKey: 'category_id' });

post.hasMany(postComment, { foreignKey: 'post_id' });
postComment.belongsTo(post, { foreignKey: 'post_id' });

user.hasMany(postComment, { foreignKey: 'user_id' });
postComment.belongsTo(user, { foreignKey: 'user_id' });

export const db = { 
  Sequelize: Sequelize, 
  sequelize: sequelize,
  User: user,
  Category: category,
  Post: post,
  PostComment: postComment,
};

//

const events = [
  {name: 'beforeExit', exitCode: 0 },
  {name: 'uncaughtExecption', exitCode: 1 },
  {name: 'SIGINT', exitCode: 130 },
  {name: 'SIGTERM', exitCode: 143 }
];

events.forEach(e => {
  process.on(e.name, () => {
    sequelize.connectionManager.close()
      .then(() => { 
        console.log('connection cleaned');
        process.exit(e.exitCode) ;
      })
      .catch((err: any) => {
        console.error(err);
        process.exit(1);
      });
  })
});
