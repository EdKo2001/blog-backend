"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const ROLES_1 = __importDefault(require("../../constants/ROLES"));
const updatePost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await models_1.postModel.findOne({ slug });
    if (
      (post === null || post === void 0 ? void 0 : post.user.toString()) !==
        req.user.id &&
      req.user.role !== ROLES_1.default.ADMIN
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    if (req.body.tags) {
      await models_1.postModel.updateOne(
        {
          slug,
        },
        {
          title: req.body.title,
          content: req.body.content,
          imageUrl: req.body.imageUrl,
          status: req.body.status,
          tags: req.body.tags.split(","),
        }
      );
    } else {
      await models_1.postModel.updateOne(
        {
          slug,
        },
        {
          title: req.body.title,
          content: req.body.content,
          imageUrl: req.body.imageUrl,
          status: req.body.status,
        }
      );
    }
    res.status(204).json({
      success: true,
    });
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to update article",
    });
  }
};
exports.default = updatePost;
