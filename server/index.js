require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// express, path, cors, dotenv
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();
const router = require("./routes");

// database set up
const db = require("./database");
db.sequelize.sync();

// server port, production mode
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const PRODUCTION_MODE = process.env.NODE_ENV === "production";

// cors, json parser, bodyparser
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routing
app.use("/api/", router);

// serve production build
if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// start server
app.listen(SERVER_PORT, () => {
  console.log("reddit-clone server started at port " + SERVER_PORT);
});
