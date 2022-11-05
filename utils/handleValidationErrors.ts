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
  const errors = validationResult(req).formatWith(errorFormatter).array();
  if (errors.length > 0) {
    req.error = { message: JSON.stringify(errors) };
    let errorsObj = {};
    for (let i = 0; i < errors.length; i++) {
      Object.assign(errorsObj, errors[i]);
    }
    return res.status(400).json({ errors: errorsObj });
  }

  next();
};

export default handleValidationErrors;
