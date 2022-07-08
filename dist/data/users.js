"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const users = [
    {
        _id: new mongoose_1.Types.ObjectId("4edd40c86762e0fb12000003"),
        fullName: "Admin User",
        email: "admin@admin.com",
        password: "password",
        passwordHash: "passwordHash",
        token: "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIn0.aPDai2YbXazCylOpSStHCbL_pLWLdPSFsGNM5U2EYiM",
    },
];
exports.default = users;
