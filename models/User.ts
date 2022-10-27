import { Document, Schema, Model, model } from "mongoose";

import ROLES from "../constants/ROLES";

export interface IUser {
  fullName: string;
  email: string;
  passwordHash: string;
  role: ROLES;
  avatarUrl?: string;
}

export interface UserDocument extends IUser, Document {}

export type UserModal = Model<any>;

const UserSchema = new Schema<UserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: ROLES.USER,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default model<UserDocument, UserModal>("User", UserSchema);
