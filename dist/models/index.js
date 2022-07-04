"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = exports.userModel = void 0;
var User_1 = require("./User");
Object.defineProperty(exports, "userModel", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
var Post_1 = require("./Post");
Object.defineProperty(exports, "postModel", { enumerable: true, get: function () { return __importDefault(Post_1).default; } });
