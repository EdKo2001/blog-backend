"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const utils_1 = require("../../utils");
const POST_STATUSES_1 = __importDefault(require("../../constants/POST_STATUSES"));
const getPosts = async (req, res) => {
    try {
        let posts;
        if (req.query.hasOwnProperty("popular")) {
            if (req.query.popular !== "") {
                return res.status(400).json({ error: "popular must be empty" });
            }
            posts = await models_1.postModel
                .find({ status: { $ne: POST_STATUSES_1.default.DRAFTED } })
                .select("-comments -content")
                .sort({ viewsCount: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("tag")) {
            if (req.query.tag === "") {
                return res.status(400).json({ error: "tag can't be empty" });
            }
            posts = await models_1.postModel
                .find({
                status: { $ne: POST_STATUSES_1.default.DRAFTED },
                tags: { $in: req.query.tag },
            })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("relevant")) {
            if (req.query.relevant !== "") {
                return res.status(400).json({ error: "relevant must be empty" });
            }
            posts = await models_1.postModel
                .find({ status: { $ne: POST_STATUSES_1.default.DRAFTED } })
                .select("-comments -content")
                .sort({ likes: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("userId")) {
            if (req.query.userId === "") {
                return res.status(400).json({ error: "userId mustn't be empty" });
            }
            posts = await models_1.postModel
                .find({ user: { $eq: req.query.userId } })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("own")) {
            const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
            if (req.query.own !== "") {
                return res.status(400).json({ error: "own must be empty" });
            }
            posts = await models_1.postModel
                .find({ user: decoded._id })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("favorites")) {
            const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
            if (req.query.favorites !== "") {
                return res.status(400).json({ error: "favorites must be empty" });
            }
            posts = await models_1.postModel
                .find({ likes: { $elemMatch: { user: decoded._id } } })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("search")) {
            if (req.query.search === "") {
                return res.status(400).json({ error: "search mustn't be empty" });
            }
            const all = req.query.hasOwnProperty("all");
            posts = all
                ? await models_1.postModel
                    .find({
                    title: { $regex: req.query.search, $options: "i" },
                })
                    .select("-comments -content")
                    .sort({ createdAt: -1 })
                    .populate("user", "fullName _id avatarUrl")
                    .exec()
                : await models_1.postModel
                    .find({
                    status: { $ne: POST_STATUSES_1.default.DRAFTED },
                    title: { $regex: req.query.search, $options: "i" },
                })
                    .select("-comments -content")
                    .sort({ createdAt: -1 })
                    .populate("user", "fullName _id avatarUrl")
                    .exec();
        }
        else if (req.query.hasOwnProperty("id")) {
            if (req.query.id === "") {
                return res.status(400).json({ error: "id mustn't be empty" });
            }
            posts = await models_1.postModel
                .find({ _id: { $in: req.query.id.split(",") } })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else if (req.query.hasOwnProperty("all")) {
            if (req.query.all !== "") {
                return res.status(400).json({ error: "all must be empty" });
            }
            posts = await models_1.postModel
                .find()
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        else {
            posts = await models_1.postModel
                .find({ status: { $ne: POST_STATUSES_1.default.DRAFTED } })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec();
        }
        res.json((0, utils_1.paginate)(posts, req.query.page, req.query.limit));
    }
    catch (error) {
        req.error = { message: error };
        console.log(error);
        res.status(503).json({
            message: "Failed to retrieve articles",
        });
    }
};
exports.default = getPosts;
