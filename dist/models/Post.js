"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const POST_STATUSES_1 = __importDefault(require("../constants/POST_STATUSES"));
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
        unique: true,
    },
    excerpt: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        enum: POST_STATUSES_1.default,
        default: POST_STATUSES_1.default.PUBLISHED,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    likes: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            createdAt: {
                type: Date,
                required: true,
            },
        },
    ],
    likesCount: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            createdAt: {
                type: Date,
                required: true,
            },
        },
    ],
    commentsCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageUrl: String,
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Post", PostSchema);
