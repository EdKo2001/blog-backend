import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userModel } from "../../models";

const register = async (req: Request, res: Response) => {
  try {
    const isExistsUser = await userModel.findOne({ email: req.body.email });
    if (isExistsUser) {
      res.status(500).json({
        message: "The email has already been taken.",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new userModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save().catch((error: MongooseError) => {
      res.json(error);
    });

    const token = jwt.sign(
      {
        //@ts-ignore
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    req.error = error;
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export default register;
