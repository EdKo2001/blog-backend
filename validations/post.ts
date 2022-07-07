import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Enter article title").isLength({ min: 3 }).isString(),
  body("text", "Enter article content").isLength({ min: 3 }).isString(),
  body("tags", "Wrong tag format").optional().isString(),
  body("imageUrl", "Invalid image link").optional().isString(),
];
