import express, { NextFunction, Request, Response } from "express";

import { postController } from "../../controllers";

import { postCreateValidation } from "../../validations/post";

import { checkAuth, authRole, handleValidationErrors } from "../../utils";

import { canDeletePost, canUpdatePost } from "../../permissions/post";

import ROLES from "../../constants/ROLES";

const router = express.Router();

router.get("/", postController.getPosts);

router.get("/tags", postController.getTags);

router.get("/:id", postController.getPost);

router.post(
  "/",
  checkAuth,
  authRole([ROLES.ADMIN, ROLES.AUTHOR]),
  postCreateValidation,
  handleValidationErrors,
  postController.createPost
);

router.delete("/:id", checkAuth, canDeletePost, postController.removePost);

router.patch(
  "/:id",
  checkAuth,
  canUpdatePost,
  postCreateValidation,
  handleValidationErrors,
  postController.updatePost
);

router.get("/:postId/comments", postController.getComments);

router.put(
  "/:postId/comments",
  checkAuth,
  // postCreateValidation,
  handleValidationErrors,
  postController.createComment
);

router.get("/:postId/likes", postController.getLikes);

router.put(
  "/:postId/like",
  checkAuth, // postCreateValidation,
  postController.createLike
);
router.put(
  "/:postId/unlike",
  checkAuth, // postCreateValidation,
  postController.deleteLike
);

export default router;
