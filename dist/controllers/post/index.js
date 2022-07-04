"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createPost_1 = __importDefault(require("./createPost"));
const getPosts_1 = __importDefault(require("./getPosts"));
const getPost_1 = __importDefault(require("./getPost"));
const removePost_1 = __importDefault(require("./removePost"));
const updatePost_1 = __importDefault(require("./updatePost"));
const getLastTags_1 = __importDefault(require("./getLastTags"));
const postController = {
    createPost: createPost_1.default,
    getPosts: getPosts_1.default,
    getPost: getPost_1.default,
    removePost: removePost_1.default,
    updatePost: updatePost_1.default,
    getLastTags: getLastTags_1.default,
};
exports.default = postController;
