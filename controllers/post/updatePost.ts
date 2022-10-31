import { Request, Response } from "express";

import { postModel } from "../../models";

import ROLES from "../../constants/ROLES";

const updatePost = async (req: Request, res: Response) => {
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

    if (req.body.tags) {
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
