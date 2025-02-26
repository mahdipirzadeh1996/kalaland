const Joi = require("joi");
const createHttpError = require("http-errors");
const { MongoIdPatern } = require("../../../utils/constans");

const addRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش صحیح نمیباشد")),
});


module.exports = {
    addRoleSchema
}