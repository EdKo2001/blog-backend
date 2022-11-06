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
const getTags_1 = __importDefault(require("./getTags"));
const createComment_1 = __importDefault(require("./createComment"));
const getComments_1 = __importDefault(require("./getComments"));
const createLike_1 = __importDefault(require("./createLike"));
const getLikes_1 = __importDefault(require("./getLikes"));
const deleteLike_1 = __importDefault(require("./deleteLike"));
const postController = {
    createPost: createPost_1.default,
    getPosts: getPosts_1.default,
    getPost: getPost_1.default,
    removePost: removePost_1.default,
    updatePost: updatePost_1.default,
    getTags: getTags_1.default,
    createComment: createComment_1.default,
    getComments: getComments_1.default,
    createLike: createLike_1.default,
    getLikes: getLikes_1.default,
    deleteLike: deleteLike_1.default,
};
exports.default = postController;
