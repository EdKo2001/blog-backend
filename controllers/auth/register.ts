import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userModel } from "../../models";

const register = async (req: Request, res: Response) => {
  try {
    const isExistsUser = await userModel.findOne({ email: req.body.email });
    if (isExistsUser) {
      return res.status(422).json({
        message: "The email has already been taken",
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

    const user = await doc.save().catch((error: Error) => {
      req.error = { message: error };
      res.json(error);
    });

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT as string,
      {
        expiresIn: "24h",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(201).json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    req.error = { message: error };
    res.status(503).json({
      message: "Failed to register",
    });
  }
};

export default register;
