"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
const login = async (req, res) => {
    try {
        const user = await models_1.userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(422).json({
                message: "User is not found",
            });
        }
        const isValidPass = await bcrypt_1.default.compare(req.body.password, user.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: "Invalid login or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT, {
            expiresIn: "24h",
        });
        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });
    }
    catch (error) {
        console.log(error);
        req.error = { message: error };
        res.status(503).json({
            message: "Failed to login",
        });
    }
};
exports.default = login;
