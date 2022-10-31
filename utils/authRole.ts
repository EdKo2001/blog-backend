import { NextFunction, Request, Response } from "express";

const authRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      return res.json("Not Allowed");
    }
    next();
  };
};

export default authRole;
