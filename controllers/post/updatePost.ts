import { Request, Response } from "express";

import { postModel } from "../../models";

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
      await postModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          status: req.body.status,
          tags: req.body.tags.split(","),
        }
      );
    } else {
      await postModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          status: req.body.status,
        }
      );
    }

    res.status(204).json({
      success: true,
    });
  } catch (error) {
    req.error = error;
    console.log(error);
    res.status(503).json({
      message: "Failed to update article",
    });
  }
};

export default updatePost;
