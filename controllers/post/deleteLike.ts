import { Request, Response } from "express";

import { postModel } from "../../models";

const deleteLike = async (req: Request, res: Response) => {
  try {
    const like = {
      user: req.user.id,
    };

    postModel
      .findOneAndUpdate(
        { slug: req.params.slug },
        { $pull: { likes: like }, $inc: { likesCount: -1 } },
        { new: true }
      )
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        return res.status(422).json({
          message: err,
        });
      });
  } catch (err) {
    req.error = { message: err };
    console.log(err);
    res.status(503).json({
      message: "Failed to delete like",
    });
  }
};

export default deleteLike;
