import { Request, Response } from "express";

import { postModel } from "../../models";

const getLikes = async (req: Request, res: Response) => {
  try {
    const foundLikes = await postModel.findOne(
      { slug: req.params.slug },
      {
        likes: 1,
      }
    );

    if (!foundLikes) {
      return res.status(404).json({
        message: "Likes aren't not found",
      });
    }

    res.json(foundLikes.likes);
  } catch (err) {
    console.log(err);
    req.error = err;
    res.status(503).json({
      message: "Failed to get likes",
    });
  }
};

export default getLikes;
