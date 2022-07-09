"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    User: (0, mongoose_to_swagger_1.default)(User_1.default),
};
