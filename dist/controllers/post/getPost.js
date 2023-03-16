"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const getPost = async (req, res) => {
    var _a;
    try {
        const slug = req.params.slug;
        const fields = (_a = req.query.fields) === null || _a === void 0 ? void 0 : _a.split(",");
        const selectedFieldsObject = fields === null || fields === void 0 ? void 0 : fields.reduce((obj, item) => ((obj[item] = 1), obj), {});
        models_1.postModel
            .findOneAndUpdate({
            slug,
        }, {
            $inc: { viewsCount: 1 },
        }, {
            fields: selectedFieldsObject,
            returnDocument: "after",
        })
            .select("-comments -excerpt")
            .populate("user", "fullName _id avatarUrl")
            .then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: "Article not found",
                });
            }
            res.json(doc);
        })
            .catch((err) => {
            req.error = { message: err };
            console.log(err);
            return res.status(500).json({
                message: "Unable to return article",
            });
        });
    }
    catch (err) {
        req.error = { message: err };
        console.log(err);
        res.status(503).json({
            message: "Failed to retrieve articles",
        });
    }
};
exports.default = getPost;
