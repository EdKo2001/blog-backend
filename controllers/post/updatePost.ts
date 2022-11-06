import { Request, Response } from "express";

import { postModel } from "../../models";

import ROLES from "../../constants/ROLES";

const updatePost = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const post = await postModel.findOne({ slug });

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
          slug,
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
          slug,
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
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to update article",
    });
  }
};

export default updatePost;
