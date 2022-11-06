"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errorFormatter = ({ location, msg, param }) => {
        return {
            [param]: msg,
        };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter).array();
    if (errors.length > 0) {
        let errorsObj = {};
        for (let i = 0; i < errors.length; i++) {
            Object.assign(errorsObj, errors[i]);
        }
        req.error = { message: JSON.stringify(errorsObj) };
        return res.status(400).json({ errors: errorsObj });
    }
    next();
};
exports.default = handleValidationErrors;
