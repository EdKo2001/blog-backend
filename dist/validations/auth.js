"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)("email", "Invalid email format").isEmail(),
    (0, express_validator_1.body)("password", "Password must be at least 5 characters").isLength({
        min: 5,
    }),
];
exports.registerValidation = [
    (0, express_validator_1.body)("email", "Invalid email format").isEmail(),
    (0, express_validator_1.body)("password", "Password must be at least 5 characters").isLength({
        min: 5,
    }),
    (0, express_validator_1.body)("fullName", "Name must be at least 3 characters").isLength({ min: 3 }),
    (0, express_validator_1.body)("avatarUrl", "Invalid avatar link").optional().isURL(),
];
