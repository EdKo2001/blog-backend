"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
            req.userId = decoded._id;
            next();
        }
        catch (e) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
    }
    else {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
exports.default = checkAuth;
