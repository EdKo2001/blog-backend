"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        req.error = { message: JSON.stringify(errors) };
        return res.status(400).json(errors.array());
    }
    next();
};
exports.default = handleValidationErrors;
