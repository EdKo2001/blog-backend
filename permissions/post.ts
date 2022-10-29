import { NextFunction, Request, Response } from "express";

import ROLES from "../constants/ROLES";

export const canDeletePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== ROLES.ADMIN && req.user.role !== ROLES.AUTHOR) {
    return res.status(401).json("Not Allowed");
  }

  next();
};

export const canUpdatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== ROLES.ADMIN && req.user.role !== ROLES.AUTHOR) {
    return res.status(401).json("Not Allowed");
  }

  next();
};
