import { Request, Response } from "express";
import { ExtractMongooseArray, MongooseError } from "mongoose";

import { postModel } from "../../models";

import ROLES from "../../constants/ROLES";

const removePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);

    if (
      post?.user.toString() !== req.user.id &&
      req.user.role !== ROLES.ADMIN
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    postModel.findOneAndDelete(
      {
        _id: postId,
      },
      (error: MongooseError, doc: ExtractMongooseArray<any>) => {
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

        res.status(204).json({
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
