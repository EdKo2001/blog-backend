"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const getPost = async (req, res) => {
    try {
        const slug = req.params.slug;
        models_1.postModel
            .findOneAndUpdate({
            slug,
        }, {
            $inc: { viewsCount: 1 },
        }, {
            returnDocument: "after",
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Unable to return article",
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Article not found",
                });
            }
            res.json(doc);
        })
            .select("-comments -likes -excerpt")
            .populate("user", "fullName _id avatarUrl");
    }
    catch (error) {
        req.error = { message: error };
        console.log(error);
        res.status(503).json({
            message: "Failed to retrieve articles",
        });
    }
};
exports.default = getPost;
