"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./user.router");
const category_router_1 = require("./category.router");
const router = express_1.default.Router();
exports.router = router;
// api/user
router.use('/user', user_router_1.UserRoute);
router.use('/category', category_router_1.CategoryRoute);
