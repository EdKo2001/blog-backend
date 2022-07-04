"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postCreateValidation = [
    (0, express_validator_1.body)("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)("tags", "Неверный формат тэгов").optional().isString(),
    (0, express_validator_1.body)("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
