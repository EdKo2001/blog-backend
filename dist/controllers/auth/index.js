"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const current_1 = __importDefault(require("./current"));
const authController = {
    login: login_1.default,
    register: register_1.default,
    current: current_1.default,
};
exports.default = authController;
