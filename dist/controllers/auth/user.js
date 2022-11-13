"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const user = async (req, res) => {
    try {
        const user = await models_1.userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User is not found",
            });
        }
        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    }
    catch (error) {
        console.log(error);
        req.error = { message: error };
        res.status(503).json({
            message: "Internal Server Error",
        });
    }
};
exports.default = user;
