import { Request, Response } from "express";

import { userModel } from "../../models";

const current = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    console.log(req.userId); //@ts-ignore
    console.log(typeof req.userId); //@ts-ignore
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default current;
