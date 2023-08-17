require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// express, path, cors, dotenv
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { router } from './routes';
import { db } from './db';

const app = express();

// database set up
db.sequelize.sync();

// server port, production mode
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

// cors, json parser, bodyparser
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routing
app.use('/api/', router);

// serve production build
if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// start server
app.listen(SERVER_PORT, () => {
  console.log('server started at port ' + SERVER_PORT);
});
