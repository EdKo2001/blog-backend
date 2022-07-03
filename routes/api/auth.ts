import express from "express";

import { authController } from "../../controllers";

import { loginValidation, registerValidation } from "../../validations/auth";

import { checkAuth, handleValidationErrors } from "../../utils";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  authController.login
);

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  authController.register
);

router.get("/me", checkAuth, authController.current);

export default router;
