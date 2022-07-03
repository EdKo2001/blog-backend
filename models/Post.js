const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", PostSchema);

module.exports = Post;
