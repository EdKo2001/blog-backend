"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const post_1 = require("../../validations/post");
const utils_1 = require("../../utils");
const router = express_1.default.Router();
router.get("/", controllers_1.postController.getPosts);
router.get("/tags", controllers_1.postController.getLastTags);
router.get("/:id", controllers_1.postController.getPost);
router.post("/", utils_1.checkAuth, post_1.postCreateValidation, utils_1.handleValidationErrors, controllers_1.postController.createPost);
router.delete("/:id", utils_1.checkAuth, controllers_1.postController.removePost);
router.patch("/:id", utils_1.checkAuth, post_1.postCreateValidation, utils_1.handleValidationErrors, controllers_1.postController.updatePost);
exports.default = router;
