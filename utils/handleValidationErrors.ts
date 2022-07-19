import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationError } from "express-validator";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorFormatter = ({ location, msg, param }: ValidationError) => {
    return {
      [param]: msg,
    };
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    req.error = { message: JSON.stringify(errors.array()) };
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default handleValidationErrors;
