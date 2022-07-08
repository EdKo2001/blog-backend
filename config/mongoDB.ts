import { Express } from "express";
import mongoose, { MongooseError } from "mongoose";

const connectDB = async (app: Express, PORT: number) => {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
      app.listen(PORT, () => {
        console.log("Server listening on http://localhost:" + PORT);
      });
    })
    .catch((err: MongooseError) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDB;
