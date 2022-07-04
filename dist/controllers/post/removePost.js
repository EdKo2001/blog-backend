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
const removePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        models_1.postModel.findOneAndDelete({
            _id: postId,
        }, 
        //@ts-ignore
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Failed to delete article",
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Article not found",
                });
            }
            res.json({
                success: true,
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to retrieve articles",
        });
    }
});
exports.default = removePost;
