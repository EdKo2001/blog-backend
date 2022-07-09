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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoDB_js_1 = __importDefault(require("./mongoDB.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const users_js_1 = __importDefault(require("../data/users.js"));
dotenv_1.default.config();
(0, mongoDB_js_1.default)();
const importUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let newUsers = [...users_js_1.default];
    try {
        yield User_js_1.default.deleteMany({
            $match: {
                _id: {
                    $in: [users_js_1.default.map((user) => user._id)],
                },
            },
        });
        yield User_js_1.default.find({
            $or: [
                {
                    _id: users_js_1.default.map((user) => user._id),
                },
                {
                    email: users_js_1.default.map((user) => user.email),
                },
            ],
        }).then((dbUsers) => {
            dbUsers.forEach((dbUser) => (newUsers = users_js_1.default.filter((user) => dbUser._id !== user._id && dbUser.email !== user.email)));
        });
        yield User_js_1.default.insertMany(newUsers).then((result) => result.length > 0
            ? console.log("Users Imported")
            : console.log("Users Up-To-Date"));
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
const deleteUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_js_1.default.deleteMany({
            $match: {
                _id: {
                    $in: [users_js_1.default.map((user) => user._id)],
                },
            },
        }).then((result) => result.deletedCount === 0
            ? console.log("Users Up-To-Date")
            : console.log("Users Deleted"));
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
switch (process.argv[2]) {
    case "-d": {
        deleteUsers();
        break;
    }
    default: {
        importUsers();
    }
}
