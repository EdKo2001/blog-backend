import { Request, Response } from "express";

import { postModel } from "../../models";

const createLike = async (req: Request, res: Response) => {
  try {
    const like = {
      user: req.userId,
      createdAt: Date.now(),
    };

    postModel
      .findByIdAndUpdate(
        req.params.postId,
        { $push: { likes: like } },
        { new: true }
      )
      .exec((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(422).json({
            message: err,
          });
        }

        res.json(doc);
      });
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to create comment",
    });
  }
};

export default createLike;