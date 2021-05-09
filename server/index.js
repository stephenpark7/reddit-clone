require('dotenv').config();

// express, path, cors, dotenv
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// database set up
const db = require('./models');
db.sequelize.sync();

// server port, production mode
const SERVER_PORT = process.env.PORT || 5000;
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

// cors, json parser, bodyparser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routing
app.use('/api/', require('./api/'));

// serve production build
if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// start server
app.listen(SERVER_PORT, () => {
  console.log('Server started at port ' + SERVER_PORT);
});