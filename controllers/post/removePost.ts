import { Request, Response } from "express";

import { postModel } from "../../models";

const removePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    postModel.findOneAndDelete(
      {
        _id: postId,
      },
      //@ts-ignore
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to delete article",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default removePost;
