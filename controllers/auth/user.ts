import { Request, Response } from "express";

import { userModel } from "../../models";

const user = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    req.error = error;
    res.status(503).json({
      message: "Internal Server Error",
    });
  }
};

export default user;
