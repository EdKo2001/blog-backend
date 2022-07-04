"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = exports.authController = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authController", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var post_1 = require("./post");
Object.defineProperty(exports, "postController", { enumerable: true, get: function () { return __importDefault(post_1).default; } });
