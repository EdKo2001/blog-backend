import { Request, Response } from "express";
import axios from "axios";

import { postModel } from "../../models";

import CACHE_KEYS from "../../constants/CACHE_KEYS";

import { deleteRedisAsync } from "../../config";

const createComment = async (req: Request, res: Response) => {
  try {
    const comment = {
      text: req.body.text,
      user: req.user.id,
      createdAt: Date.now(),
    };

    const captchaVerifeid = await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body.captchaToken}`
      )
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: err,
        });
      });

    if (!captchaVerifeid.success) {
      return res
        .status(400)
        .json({ error: "Invalid the captcha's client-side response" });
    }

    postModel
      .findOneAndUpdate(
        { slug: req.params.slug },
        { $push: { comments: comment }, $inc: { commentsCount: 1 } },
        { new: true }
      )
      .populate("comments.user", "fullName avatarUrl")
      .then((doc) => {
        deleteRedisAsync(CACHE_KEYS.RECENT_POSTS);
        res.json(doc);
      })
      .catch((err) => {
        req.error = { message: err };
        console.log(err);
        return res.status(422).json({
          message: err,
        });
      });
  } catch (err) {
    req.error = { message: err };
    console.log(err);
    res.status(503).json({
      message: "Failed to create like",
    });
  }
};

export default createComment;
