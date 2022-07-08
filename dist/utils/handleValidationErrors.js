"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errorFormatter = ({ location, msg, param }) => {
        return {
            [param]: msg,
        };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        req.error = { message: JSON.stringify(errors.array()) };
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.default = handleValidationErrors;
