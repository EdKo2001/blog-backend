import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { postModel } from "../../models";

import { paginate } from "../../utils";

import POST_STATUSES from "../../constants/POST_STATUSES";
import CACHE_KEYS from "../../constants/CACHE_KEYS";

import { getRedisAsync, setRedisAsync } from "../../config";

const getPosts = async (req: Request, res: Response) => {
  try {
    let posts;

    if (req.query.hasOwnProperty("popular")) {
      if (req.query.popular !== "") {
        return res.status(400).json({ error: "popular must be empty" });
      }
      posts = await postModel
        .find({ status: { $ne: POST_STATUSES.DRAFTED } })
        .select("-comments -content")
        .sort({ viewsCount: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("tag")) {
      if (req.query.tag === "") {
        return res.status(400).json({ error: "tag can't be empty" });
      }
      posts = await postModel
        .find({
          status: { $ne: POST_STATUSES.DRAFTED },
          tags: { $in: req.query.tag },
        })
        .select("-comments -content")
        .sort({ createdAt: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("relevant")) {
      if (req.query.relevant !== "") {
        return res.status(400).json({ error: "relevant must be empty" });
      }
      posts = await postModel
        .find({ status: { $ne: POST_STATUSES.DRAFTED } })
        .select("-comments -content")
        .sort({ likes: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("userId")) {
      if (req.query.userId === "") {
        return res.status(400).json({ error: "userId mustn't be empty" });
      }
      posts = await postModel
        .find({ user: { $eq: req.query.userId } })
        .select("-comments -content")
        .sort({ createdAt: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("own")) {
      const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

      const decoded = jwt.verify(
        token,
        process.env.JWT as string
      ) as jwt.JwtPayload;

      if (req.query.own !== "") {
        return res.status(400).json({ error: "own must be empty" });
      }

      posts = await postModel
        .find({ user: decoded._id })
        .select("-comments -content")
        .sort({ createdAt: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("favorites")) {
      const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

      const decoded = jwt.verify(
        token,
        process.env.JWT as string
      ) as jwt.JwtPayload;

      if (req.query.favorites !== "") {
        return res.status(400).json({ error: "favorites must be empty" });
      }

      posts = await postModel
        .find({ likes: { $elemMatch: { user: decoded._id } } })
        .select("-comments -content")
        .sort({ createdAt: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("search")) {
      if (req.query.search === "") {
        return res.status(400).json({ error: "search mustn't be empty" });
      }
      const all = req.query.hasOwnProperty("all");
      posts = all
        ? await postModel
            .find({
              title: { $regex: req.query.search, $options: "i" },
            })
            .select("-comments -content")
            .sort({ createdAt: -1 })
            .populate("user", "fullName _id avatarUrl")
            .exec()
        : await postModel
            .find({
              status: { $ne: POST_STATUSES.DRAFTED },
              title: { $regex: req.query.search, $options: "i" },
            })
            .select("-comments -content")
            .sort({ createdAt: -1 })
            .populate("user", "fullName _id avatarUrl")
            .exec();
    } else if (req.query.hasOwnProperty("id")) {
      if (req.query.id === "") {
        return res.status(400).json({ error: "id mustn't be empty" });
      }

      posts = await postModel
        .find({ _id: { $in: (req.query.id as string).split(",") } })
        .select("-comments -content")
        .sort({ createdAt: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else if (req.query.hasOwnProperty("all")) {
      if (req.query.all !== "") {
        return res.status(400).json({ error: "all must be empty" });
      }
      posts = await postModel
        .find()
        .select("-comments -content")
        .sort({ createdAt: -1 })
        .populate("user", "fullName _id avatarUrl")
        .exec();
    } else {
      const cachedPosts = await getRedisAsync(CACHE_KEYS.RECENT_POSTS);

      if (cachedPosts) {
        posts = JSON.parse(cachedPosts);
      } else {
        posts = await postModel
          .find({ status: { $ne: POST_STATUSES.DRAFTED } })
          .select("-comments -content")
          .sort({ createdAt: -1 })
          .populate("user", "fullName _id avatarUrl")
          .exec();

        setRedisAsync(CACHE_KEYS.RECENT_POSTS, JSON.stringify(posts));
      }
    }

    res.json(paginate(posts, req.query.page, req.query.limit));
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPosts;
