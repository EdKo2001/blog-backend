const express = require("express");

const { AuthController } = require("../../controllers");

const {
  loginValidation,
  registerValidation,
} = require("../../validations/auth");

const { checkAuth, handleValidationErrors } = require("../../utils");

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  AuthController.login
);

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  AuthController.register
);

router.get("/me", checkAuth, AuthController.current);

module.exports = router;
