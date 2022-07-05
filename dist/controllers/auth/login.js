"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "User is not found",
            });
        }
        const isValidPass = yield bcrypt_1.default.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: "Invalid login or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, "secret123", {
            expiresIn: "30d",
        });
        //@ts-ignore
        const _a = user._doc, { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
        res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to login",
        });
    }
});
exports.default = login;
