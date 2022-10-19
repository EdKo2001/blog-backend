import express from "express";

import { postController } from "../../controllers";

import { postCreateValidation } from "../../validations/post";

import { checkAuth, handleValidationErrors } from "../../utils";

const router = express.Router();

router.get("/", postController.getPosts);

router.get("/tags", postController.getTags);

router.get("/:id", postController.getPost);

router.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.createPost
);

router.delete("/:id", checkAuth, postController.removePost);

router.patch(
  "/:id",
  checkAuth,
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
