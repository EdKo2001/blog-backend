import { Request, Response } from "express";
import { ExtractMongooseArray, MongooseError } from "mongoose";

import { postModel } from "../../models";

const removePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    postModel.findOneAndDelete(
      {
        _id: postId,
      },
      (error: MongooseError, doc: ExtractMongooseArray<any>) => {
        typeof doc;
        if (error) {
          req.error = error;
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
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default removePost;
