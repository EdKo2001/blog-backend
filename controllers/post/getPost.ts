import { Request, Response } from "express";

import { postModel } from "../../models";

const getPost = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    postModel
      .findOneAndUpdate(
        {
          slug,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        },
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
      .select("-comments -likes")
      .populate("user", "fullName _id");
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPost;
