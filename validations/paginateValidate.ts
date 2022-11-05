import { NextFunction, Request, Response } from "express";

const paginateValidate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      isNaN(req.query.page as number & string) ||
      isNaN(req.query.limit as number & string)
    ) {
      console.log("213");
      return res.status(400).json({
        message: "Page and Limit properties are required",
      });
    }
    next();
  };
};

export default paginateValidate;
