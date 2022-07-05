import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //@ts-ignore
    req.error = { message: JSON.stringify(errors) };
    return res.status(400).json(errors.array());
  }

  next();
};

export default handleValidationErrors;
