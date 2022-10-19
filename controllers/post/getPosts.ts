import { Request, Response } from "express";

import { postModel } from "../../models";
import { paginate } from "../../utils";

const getPosts = async (req: Request, res: Response) => {
  try {
    let posts;

    if (req.query.hasOwnProperty("popular")) {
      if (req.query.popular !== "") {
        return res.status(400).json({ error: "Popular must be empty" });
      }
      posts = await postModel
        .find()
        .sort({ viewsCount: -1 })
        .populate("user")
        .exec();
    } else if (req.query.hasOwnProperty("tag")) {
      if (req.query.tag === "") {
        return res.status(400).json({ error: "Tag can't be empty" });
      }
      posts = await postModel
        .find({ tags: { $in: req.query.tag } })
        .sort({ createdAt: -1 })
        .populate("user")
        .exec();
    } else if (req.query.hasOwnProperty("relevant")) {
      if (req.query.relevant !== "") {
        return res.status(400).json({ error: "Popular must be empty" });
      }
      posts = await postModel
        .find()
        .sort({ likes: -1 })
        .populate("user")
        .exec();
    } else {
      posts = await postModel
        .find()
        .sort({ createdAt: -1 })
        .populate("user")
        .exec();
    }
    res.json(paginate(posts, req.query.page, req.query.limit));
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPosts;
