import { Request, Response } from "express";

import { IPost, postModel } from "../../models";

import ROLES from "../../constants/ROLES";
import CACHE_KEYS from "../../constants/CACHE_KEYS";

import { getRedisAsync, setRedisAsync } from "../../config";
import POST_STATUSES from "../../constants/POST_STATUSES";

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
          content: req.body.content,
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
          content: req.body.content,
          imageUrl: req.body.imageUrl,
          status: req.body.status,
        }
      );
    }

    const cachedPosts = await getRedisAsync(CACHE_KEYS.RECENTPOSTS);

    if (cachedPosts) {
      const parsedPosts = JSON.parse(cachedPosts);
      if (req.body.status === POST_STATUSES.DRAFTED) {
        setRedisAsync(
          CACHE_KEYS.RECENTPOSTS,
          JSON.stringify(
            parsedPosts.filter((post: IPost) => post.slug !== slug)
          )
        );
      } else {
        const targetPost = parsedPosts.find(
          (post: IPost) => post.slug === slug
        );

        if (!targetPost) {
          setRedisAsync(
            CACHE_KEYS.RECENTPOSTS,
            JSON.stringify([
              await postModel
                .findOne({ slug })
                .select("-comments -content")
                .sort({ createdAt: -1 })
                .populate("user", "fullName _id avatarUrl")
                .exec(),
              ...parsedPosts,
            ])
          );
        } else {
          targetPost.title = req.body.title;
          targetPost.content = req.body.content;
          targetPost.imageUrl = req.body.imageUrl;
          targetPost.status = req.body.status;

          setRedisAsync(CACHE_KEYS.RECENTPOSTS, JSON.stringify(parsedPosts));
        }
      }
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
