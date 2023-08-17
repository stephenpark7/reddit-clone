"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
// express, path, cors, dotenv
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const db_1 = require("./db");
const app = (0, express_1.default)();
// database set up
db_1.db.sequelize.sync();
// server port, production mode
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';
// cors, json parser, bodyparser
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// api routing
app.use('/api/', routes_1.router);
// serve production build
if (PRODUCTION_MODE) {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
    app.get('/', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../client/build', 'index.html'));
    });
}
// start server
app.listen(SERVER_PORT, () => {
    console.log('server started at port ' + SERVER_PORT);
});
