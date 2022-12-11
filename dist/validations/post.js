"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postCreateValidation = [
    (0, express_validator_1.body)("title", "Enter article title").isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)("content", "Enter article content").isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)("tags", "Wrong tag format").optional().isString(),
    (0, express_validator_1.body)("imageUrl", "Invalid image link").optional().isString(),
];
