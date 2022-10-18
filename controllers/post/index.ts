import createPost from "./createPost";
import getPosts from "./getPosts";
import getPost from "./getPost";
import removePost from "./removePost";
import updatePost from "./updatePost";

import getLastTags from "./getLastTags";

import createComment from "./createComment";
import getComments from "./getComments";

import createLike from "./createLike";
import getLikes from "./getLikes";
import deleteLike from "./deleteLike";

const postController = {
  createPost,
  getPosts,
  getPost,
  removePost,
  updatePost,
  getLastTags,
  createComment,
  getComments,
  createLike,
  getLikes,
  deleteLike,
};

export default postController;
