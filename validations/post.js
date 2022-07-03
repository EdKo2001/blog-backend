const { body } = require("express-validator");

const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];

module.exports = {
  postCreateValidation,
};
