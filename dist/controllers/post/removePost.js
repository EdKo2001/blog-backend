"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const ROLES_1 = __importDefault(require("../../constants/ROLES"));
const removePost = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await models_1.postModel.findOne({ slug });
        if ((post === null || post === void 0 ? void 0 : post.user.toString()) !== req.user.id &&
            req.user.role !== ROLES_1.default.ADMIN) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        models_1.postModel.findOneAndDelete({
            slug,
        }, (error, doc) => {
            if (error) {
                req.error = { message: error };
                return res.status(500).json({
                    message: "Failed to delete article",
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Article not found",
                });
            }
            res.status(204).json({
                success: true,
            });
        });
    }
    catch (error) {
        req.error = { message: error };
        console.log(error);
        res.status(503).json({
            message: "Failed to retrieve articles",
        });
    }
};
exports.default = removePost;
