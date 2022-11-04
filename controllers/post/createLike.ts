import { Request, Response } from "express";

import { postModel } from "../../models";

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
