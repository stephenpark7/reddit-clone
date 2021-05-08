const express = require('express');
const path = require('path');
const app = express();

const SERVER_PORT = process.env.PORT || 5000;
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(SERVER_PORT, () => {
  console.log('Server started at port ' + SERVER_PORT);
});