"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.create = void 0;
const db_1 = require("../db");
const User = db_1.db.User;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
// Create a new account
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Check for missing fields
    if (!username || !password) {
        res.status(400).send('Missing field(s)');
        return;
    }
    // Username validation
    if (!validator_1.default.isAlphanumeric(username)) {
        res.status(400).send('Username must contain only alphanumeric characters.');
        return;
    }
    // Check if username already in use
    const userData = yield User.findOne({ where: { username: username } });
    if (userData !== null) {
        res.status(400).send('Username already in use.');
        return;
    }
    // Encrypt password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Save user to database
    User.create({
        username: username,
        password: hashedPassword,
    }).then((user) => {
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id }, jwtSecret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            user_id: user.user_id,
            username: user.username,
            access_token: token,
        });
    }).catch((err) => {
        res.status(400).send('Failed to create an account.');
    });
});
exports.create = create;
// Log in to account
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Check for missing fields
    if (!username || !password) {
        res.status(400).send('Missing field(s)');
        return;
    }
    // Check if username already in use
    const userData = yield User.findOne({ where: { username: username } });
    if (userData === null) {
        res.status(400).send('Username does not exist.');
        return;
    }
    // Check password
    if (yield bcryptjs_1.default.compare(password, userData.password)) {
        const token = jsonwebtoken_1.default.sign({ user_id: userData.user_id }, jwtSecret, {
            expiresIn: 86400 // 24 hours
        });
        console.log(token);
        res.status(200).send({
            user_id: userData.user_id,
            username: username,
            access_token: token,
        });
    }
    else {
        res.status(400).send('Invalid password.');
    }
});
exports.login = login;
