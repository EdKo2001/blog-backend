import { Request, Response } from "express";

import { postModel } from "../../models";

const getLastTags = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to get tags",
    });
  }
};

export default getLastTags;
