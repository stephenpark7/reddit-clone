"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const auth = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
        return res.status(403).send('No token provided.');
    }
    const token = authHeaders.substring(7);
    if (!token) {
        return res.status(403).send('Invalid token.');
    }
    //{ user_id: any; }
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized access.');
        }
        req.userId = decoded.user_id;
        next();
    });
};
exports.auth = auth;
