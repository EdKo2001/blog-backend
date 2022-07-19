import { Request, Response } from "express";

import { postModel } from "../../models";

const createPost = async (req: Request, res: Response) => {
  try {
    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to create article",
    });
  }
};

export default createPost;
