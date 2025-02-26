const createHttpError = require("http-errors");
const Joi = require("joi");
const creatNewsSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(30)
    .min(3)
    .required()
    .error(createHttpError.BadRequest("pls enter title")),
  description: Joi.string().error(createHttpError.BadRequest("Pls Enter Text")),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.PNG|\.JPG|\.WEBP|\.JPEG|\.GIF)$/)
    .error(createHttpError.BadRequest("Pls Send Image")),
  fileUploadPath: Joi.allow(),
});
module.exports = {
  creatNewsSchema,
};
