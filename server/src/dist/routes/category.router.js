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
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.CategoryRoute = express_1.default.Router();
// api/category
exports.CategoryRoute.get('/:categoryName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, category_controller_1.getAllPosts)(req, res);
}));
exports.CategoryRoute.post('/:categoryName', auth_middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, category_controller_1.createPost)(req, res);
}));
exports.CategoryRoute.get('/:categoryName/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, category_controller_1.getPostDataById)(req, res);
}));
exports.CategoryRoute.post('/:categoryName/:postId', auth_middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, category_controller_1.createPostComment)(req, res);
}));
