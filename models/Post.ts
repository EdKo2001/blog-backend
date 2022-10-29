import { Schema, model, Document } from "mongoose";

import POST_STATUSES from "../constants/POST_STATUSES";

export interface IPost extends Document {
  title: string;
  text: string;
  status: POST_STATUSES;
  tags: string[];
  viewsCount: number;
  likes: [{ user: Schema.Types.ObjectId; createdAt: Date }];
  comments: [{ text: string; user: Schema.Types.ObjectId; createdAt: Date }];
  user: Schema.Types.ObjectId;
}

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
    status: {
      type: String,
      enum: POST_STATUSES,
      default: POST_STATUSES.PUBLISHED,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
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

export default model<IPost>("Post", PostSchema);
