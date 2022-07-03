const express = require("express");

const { PostController } = require("../../controllers");

const { postCreateValidation } = require("../../validations/post");

const { checkAuth, handleValidationErrors } = require("../../utils");

const router = express.Router();

app.get("/", PostController.getAll);

app.get("/tags", PostController.getLastTags);

app.get("/:id", PostController.getOne);

app.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

app.delete("/:id", checkAuth, PostController.remove);

app.patch(
  "/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

module.exports = router;
