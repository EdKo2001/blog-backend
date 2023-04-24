import { Request, Response } from "express";

import { postModel } from "../../models";

import { deleteRedisAsync } from "../../config";

import CACHE_KEYS from "../../constants/CACHE_KEYS";

const createLike = async (req: Request, res: Response) => {
  try {
    const like = {
      user: req.user.id,
      createdAt: Date.now(),
    };

    postModel
      .findOneAndUpdate(
        { slug: req.params.slug },
        { $push: { likes: like }, $inc: { likesCount: 1 } },
        { new: true }
      )
      .then((doc) => {
        deleteRedisAsync(CACHE_KEYS.RECENT_POSTS);
        res.json(doc);
      })
      .catch((err) => {
        req.error = { message: err };
        console.log(err);
        return res.status(422).json({
          message: err,
        });
      });
  } catch (err) {
    req.error = { message: err };
    console.log(err);
    res.status(503).json({
      message: "Failed to create comment",
    });
  }
};

export default createLike;
