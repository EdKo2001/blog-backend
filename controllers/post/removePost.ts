import { Request, Response } from "express";
import { ExtractMongooseArray } from "mongoose";

import { IPost, postModel } from "../../models";

import ROLES from "../../constants/ROLES";
import CACHE_KEYS from "../../constants/CACHE_KEYS";

import { deleteRedisAsync, getRedisAsync, setRedisAsync } from "../../config";

const removePost = async (req: Request, res: Response) => {
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

    postModel
      .findOneAndDelete({
        slug,
      })
      .then(async (doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        const cachedPosts = await getRedisAsync(CACHE_KEYS.RECENT_POSTS);

        if (cachedPosts) {
          const parsedPosts = JSON.parse(cachedPosts);

          setRedisAsync(
            CACHE_KEYS.RECENT_POSTS,
            JSON.stringify(
              parsedPosts.filter((post: IPost) => post.slug !== slug)
            )
          );
        }

        deleteRedisAsync(CACHE_KEYS.RECENT_POSTS);

        res.status(204).json({
          success: true,
        });
      })
      .catch((err) => {
        req.error = { message: err };
        return res.status(500).json({
          message: "Failed to delete article",
        });
      });
  } catch (error) {
    req.error = { message: error };
    console.log(error);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default removePost;
