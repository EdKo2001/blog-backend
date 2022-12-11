"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const createPost = async (req, res) => {
    try {
        let doc;
        if (req.body.tags) {
            doc = new models_1.postModel({
                title: req.body.title,
                slug: req.body.title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, ""),
                content: req.body.content,
                excerpt: req.body.content.slice(0, 240) + " ...",
                status: req.body.status,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(","),
                user: req.user.id,
            });
        }
        else {
            doc = new models_1.postModel({
                title: req.body.title,
                slug: req.body.title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, ""),
                content: req.body.content,
                excerpt: req.body.content.slice(0, 240) + " ...",
                status: req.body.status,
                imageUrl: req.body.imageUrl,
                user: req.user.id,
            });
        }
        const post = await doc.save();
        res.json(post);
    }
    catch (error) {
        req.error = { message: error };
        console.log(error);
        res.status(503).json({
            message: "Failed to create article",
        });
    }
};
exports.default = createPost;
