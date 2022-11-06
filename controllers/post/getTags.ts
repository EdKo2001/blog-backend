import { constants } from "buffer";
import { Request, Response } from "express";

import { postModel } from "../../models";

import { mostFreqStr, paginate } from "../../utils";

const getTags = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find();

    const tags = mostFreqStr(posts.map((obj) => obj.tags).flat());

    res.json(paginate(tags, req.query.page, req.query.limit));
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to get tags",
    });
  }
};

export default getTags;
