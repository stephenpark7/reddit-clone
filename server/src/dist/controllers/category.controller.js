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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostDataById = exports.createPostComment = exports.createPost = exports.getAllPosts = exports.getCategories = void 0;
const db_1 = require("../db");
const { User, Category, Post, PostComment } = db_1.db;
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.findAll();
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(400).send('Failed to get categories.');
    }
});
exports.getCategories = getCategories;
// Get all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName } = req.params;
    if (!categoryName)
        return;
    try {
        const categoryData = yield Category.findOne({
            where: {
                name: categoryName
            },
        });
        if (!categoryData) {
            res.status(400).send('Category does not exist.');
            return;
        }
        const postData = yield Post.findAll({
            attributes: ['post_id', 'type', 'title', 'content', 'upvotes', 'downvotes', 'createdAt'],
            where: { category_id: categoryData.category_id },
            include: [
                { model: User, attributes: ['username'] },
                { model: PostComment, attributes: ['comment_id'] }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json({
            category_id: categoryData.category_id,
            posts: postData
        });
    }
    catch (err) {
        res.status(400).send('Failed to get posts.');
    }
});
exports.getAllPosts = getAllPosts;
// Create a post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id, type, title, content } = req.query;
        if (!category_id || !type || !title || !content) {
            res.status(400).send('Missing parameter(s).');
            return;
        }
        const post = yield Post.create({
            user_id: req.userId,
            category_id: category_id,
            type: type,
            title: title,
            content: content,
        });
        res.status(200).json(post);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('Failed to create an post.');
    }
});
exports.createPost = createPost;
// Create a post comment
const createPostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        if (!postId || !content) {
            res.status(200).send('Missing parameter(s).');
            return;
        }
        const userData = yield User.findOne({ where: { user_id: req.userId } });
        let postComment = PostComment.build({
            post_id: postId,
            user_id: req.userId,
            content: content,
        });
        postComment.dataValues.User = userData;
        yield postComment.save();
        res.status(200).json(postComment);
    }
    catch (err) {
        res.status(400).send('Failed to create a post comment.');
    }
});
exports.createPostComment = createPostComment;
// Get post data (content, title, upvotes, downvotes, comments, etc.)
const getPostDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!postId) {
            res.status(200).send('Missing parameter(s).');
            return;
        }
        let post = yield Post.findOne({
            attributes: ['type', 'title', 'content', 'upvotes', 'downvotes', 'createdAt'],
            where: { post_id: postId },
            include: [
                { model: User, attributes: ['username'] },
            ],
            raw: true,
            nest: true,
        });
        const PostComments = yield PostComment.findAll({
            attributes: ['comment_id', 'content', 'createdAt'],
            where: { post_id: postId },
            include: [
                { model: User, attributes: ['username'] },
            ],
            order: [['createdAt', 'DESC']]
        });
        post.PostComments = PostComments;
        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).send('Failed to get a post.');
    }
});
exports.getPostDataById = getPostDataById;
