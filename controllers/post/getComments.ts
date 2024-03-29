import { Request, Response } from "express";

import { postModel } from "../../models";

const getComments = async (req: Request, res: Response) => {
  try {
    const foundComments = await postModel
      .findOne({ slug: req.params.slug }, { comments: 1 })
      .populate("comments.user", "fullName avatarUrl");

    if (!foundComments) {
      return res.status(404).json({
        message: "Comments aren't not found",
      });
    }

    res.json(foundComments.comments);
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to get comments",
    });
  }
};

export default getComments;
