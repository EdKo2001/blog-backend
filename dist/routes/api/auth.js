"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const auth_1 = require("../../validations/auth");
const utils_1 = require("../../utils");
const router = express_1.default.Router();
router.post("/login", auth_1.loginValidation, utils_1.handleValidationErrors, controllers_1.authController.login);
router.post("/register", auth_1.registerValidation, utils_1.handleValidationErrors, controllers_1.authController.register);
router.get("/user", utils_1.checkAuth, controllers_1.authController.user);
exports.default = router;
