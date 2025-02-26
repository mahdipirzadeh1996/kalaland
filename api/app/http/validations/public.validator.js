const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const mongoValidator = Joi.object({
  id: Joi.string()
    .pattern(MongoIdPatern)
    .error(createHttpError.NotFound("The entered ID is incorrect")),
});

module.exports = {
    mongoValidator,
 
};
