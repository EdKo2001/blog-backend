"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
const register = async (req, res) => {
    try {
        const isExistsUser = await models_1.userModel.findOne({ email: req.body.email });
        if (isExistsUser) {
            return res.status(422).json({
                message: "The email has already been taken",
            });
        }
        const password = req.body.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        const doc = new models_1.userModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
        const user = await doc.save().catch((error) => {
            req.error = { message: error };
            res.json(error);
        });
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT, {
            expiresIn: "24h",
        });
        const { passwordHash, ...userData } = user._doc;
        res.status(201).json({
            ...userData,
            token,
        });
    }
    catch (error) {
        console.log(error);
        req.error = { message: error };
        res.status(503).json({
            message: "Failed to register",
        });
    }
};
exports.default = register;
