import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT as string
      ) as jwt.JwtPayload;

      req.user = {};
      req.user.id = decoded._id;
      req.user.role = decoded.role;

      next();
    } catch (e) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default checkAuth;
