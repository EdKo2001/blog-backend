import express, { NextFunction, Request, Response } from "express";

import { postController } from "../../controllers";

import { postCreateValidation } from "../../validations/post";

import { checkAuth, authRole, handleValidationErrors } from "../../utils";

import { canDeletePost, canUpdatePost } from "../../permissions/post";

import ROLES from "../../constants/ROLES";

const router = express.Router();

router.get("/", postController.getPosts);

router.get("/tags", postController.getTags);

router.get("/:slug", postController.getPost);

router.post(
  "/",
  checkAuth,
  authRole([ROLES.ADMIN, ROLES.AUTHOR]),
  postCreateValidation,
  handleValidationErrors,
  postController.createPost
);

router.delete("/:slug", checkAuth, canDeletePost, postController.removePost);

router.patch(
  "/:slug",
  checkAuth,
  canUpdatePost,
  postCreateValidation,
  handleValidationErrors,
  postController.updatePost
);

router.get("/:slug/comments", postController.getComments);

router.put(
  "/:slug/comments",
  checkAuth,
  // postCreateValidation,
  handleValidationErrors,
  postController.createComment
);

router.get("/:slug/likes", postController.getLikes);

router.put(
  "/:slug/like",
  checkAuth, // postCreateValidation,
  postController.createLike
);

router.put(
  "/:slug/unlike",
  checkAuth, // postCreateValidation,
  postController.deleteLike
);

router.all("/", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/tags", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/:slug", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
})

router.all("/:slug/comments", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
})

router.all("/:slug/likes", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
})

router.all("/:slug/like", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
})

router.all("/:slug/unlike", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
})


export default router;
