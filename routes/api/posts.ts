import express from "express";

import { postController } from "../../controllers";

import { postCreateValidation } from "../../validations/post";

import { checkAuth, handleValidationErrors } from "../../utils";

const router = express.Router();

router.get("/", postController.getPosts);

router.get("/tags", postController.getLastTags);

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

export default router;
