import mongoose from "mongoose";
import connectDB from "./mongoDB";

import { userModel as User, postModel as Post } from "../models";

connectDB();

mongoose.connection.once("open", async () => {
  let count = 0;
  console.log("Connected to MongoDB");

  const collections = await mongoose.connection.db.listCollections().toArray();

  // Check if the "users" collection exists
  const userCollectionExists = collections.some(
    (collection) => collection.name === "users"
  );

  // Create the "users" collection if it doesn't exist
  if (!userCollectionExists) {
    await User.createCollection();
    console.log("User collection created");
    count = 1;
  }

  // Check if the "posts" collection exists
  const postCollectionExists = collections.some(
    (collection) => collection.name === "posts"
  );

  // Create the "posts" collection if it doesn't exist
  if (!postCollectionExists) {
    await Post.createCollection();
    console.log("Post collection created");
    count = 1;
  }

  if (!count) {
    console.log("Schemas are Up-To-Date");
  }

  process.exit(1);
});
