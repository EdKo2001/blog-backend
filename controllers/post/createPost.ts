import { Request, Response } from "express";

import { postModel } from "../../models";

import { deleteRedisAsync } from "../../config";

import CACHE_KEYS from "../../constants/CACHE_KEYS";

const createPost = async (req: Request, res: Response) => {
  try {
    let doc;

    if (req.body.tags) {
      doc = new postModel({
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
    } else {
      doc = new postModel({
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

    deleteRedisAsync(CACHE_KEYS.RECENT_POSTS);

    res.json(post);
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to create article",
    });
  }
};

export default createPost;
