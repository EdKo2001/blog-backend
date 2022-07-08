import { Request, Response } from "express";

import { postModel } from "../../models";

const getPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    postModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        },
        //@ts-ignore
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Unable to return article",
            });
          }

          if (!doc) {
            return res.status(404).json({
              message: "Article not found",
            });
          }

          res.json(doc);
        }
      )
      .populate("user");
  } catch (err) {
    //@ts-ignore
    req.error = error;
    console.log(err);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPost;
