"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ROLES_1 = __importDefault(require("../constants/ROLES"));
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ROLES_1.default,
        default: ROLES_1.default.USER,
    },
    avatarUrl: String,
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
