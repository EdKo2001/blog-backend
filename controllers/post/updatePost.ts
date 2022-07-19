import { Request, Response } from "express";

import { postModel } from "../../models";

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(","),
      }
    );

    res.json({
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
