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
      .then((doc) => {
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
