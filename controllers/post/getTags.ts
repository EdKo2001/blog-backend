import { Request, Response } from "express";

import { postModel } from "../../models";

import { mostFreqStr } from "../../utils";

const getTags = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find();

    let tags;
    if (req.query.limit) {
      if (!(req.query.limit as string).match("[0-9]+")) {
        return res
          .status(400)
          .json({ message: "Limit should contain only numbers" });
      }
      tags = posts
        .map((obj) => obj.tags)
        .flat()
        .slice(0, req.query.limit as any);
    } else {
      tags = mostFreqStr(posts.map((obj) => obj.tags).flat());
    }
    res.json(tags);
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to get tags",
    });
  }
};

export default getTags;
