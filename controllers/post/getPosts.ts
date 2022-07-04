import { Request, Response } from "express";

import { postModel } from "../../models";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPosts;
