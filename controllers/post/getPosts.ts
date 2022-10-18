import { Request, Response } from "express";

import { postModel } from "../../models";

const getPosts = async (req: Request, res: Response) => {
  try {
    let posts;

    if (req.query.popular === "") {
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
    } else {
      posts = await postModel
        .find()
        .sort({ createdAt: -1 })
        .populate("user")
        .exec();
    }
    res.json(posts);
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPosts;
