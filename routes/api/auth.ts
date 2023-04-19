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

router.get("/user", checkAuth, authController.user);

router.all("/login", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/register", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

router.all("/user", (req, res, next) => {
  res.status(405).json("Method Not Allowed");
});

export default router;
