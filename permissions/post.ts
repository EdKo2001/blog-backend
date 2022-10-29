import { NextFunction, Request, Response } from "express";

import ROLES from "../constants/ROLES";

export const canDeletePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    req.user.role,
    req.user.role !== ROLES.ADMIN || req.user.role !== ROLES.AUTHOR
  );
  if (req.user.role !== ROLES.ADMIN || req.user.role !== ROLES.AUTHOR) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
};

export const canUpdatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    req.user.role,
    req.user.role !== ROLES.ADMIN || req.user.role !== ROLES.AUTHOR
  );
  if (req.user.role !== ROLES.ADMIN || req.user.role !== ROLES.AUTHOR) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
};
