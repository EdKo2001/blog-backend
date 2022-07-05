import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
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

export default model<IPost>("Post", PostSchema);
