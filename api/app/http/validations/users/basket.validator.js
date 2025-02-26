const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const addToBascketSchema = Joi.object({
    productID: Joi.string()
    .pattern(MongoIdPatern)
    .error(createHttpError.BadRequest("Can not found product")),
    count:Joi.number().error(createHttpError.BadRequest("Count is not a Number")),
});
module.exports = {
    addToBascketSchema,
};
