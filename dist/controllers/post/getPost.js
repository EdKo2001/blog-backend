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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        models_1.postModel
            .findOneAndUpdate({
            _id: postId,
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
            .populate("user");
    }
    catch (error) {
        req.error = error;
        console.log(error);
        res.status(503).json({
            message: "Failed to retrieve articles",
        });
    }
});
exports.default = getPost;
