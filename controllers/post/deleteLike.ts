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
        { $pull: { likes: like } },
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
      message: "Failed to delete like",
    });
  }
};

export default deleteLike;
