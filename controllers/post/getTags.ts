import { constants } from "buffer";
import { Request, Response } from "express";

import { postModel } from "../../models";

import { mostFreqStr, paginate } from "../../utils";

const getTags = async (req: Request, res: Response) => {
  if (
    isNaN(req.query.page as number & string) ||
    isNaN(req.query.limit as number & string)
  ) {
    return res.status(400).json({
      message: "Page and Limit properties are required",
    });
  }
  try {
    const posts = await postModel.find();

    const tags = mostFreqStr(posts.map((obj) => obj.tags).flat());

    res.json(paginate(tags, req.query.page, req.query.limit));
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to get tags",
    });
  }
};

export default getTags;
