"use strict";
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
const importUsers = async () => {
    let newUsers = [...users_js_1.default];
    try {
        await User_js_1.default.updateMany(newUsers, {}, { upsert: true }).then((res) => console.log(res));
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
const deleteUsers = async () => {
    try {
        await User_js_1.default.deleteMany({
            $match: {
                _id: {
                    $in: [users_js_1.default.map((user) => user._id)],
                },
            },
        }).then((res) => res.deletedCount === 0
            ? console.log("There is no dummy user")
            : console.log("Users Deleted"));
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
switch (process.argv[2]) {
    case "-d": {
        deleteUsers();
        break;
    }
    default: {
        importUsers();
    }
}
