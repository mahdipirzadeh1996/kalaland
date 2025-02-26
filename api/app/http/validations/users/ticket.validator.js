const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const addToTicketSchema = Joi.object({
  parentID: Joi.string()
    .pattern(MongoIdPatern)
    .error(createHttpError.NotFound("Can not found Ticket")),
  topic: Joi.string()
    .trim()
    .max(30)
    .min(3)
    .required()
    .error(createHttpError.BadRequest("Topic >3 <30")),
  department: Joi.string()
    .valid("Technical", "Withdraw")
    .trim()
    .required()
    .error(createHttpError.BadRequest("department just can be ...")),
  statustick: Joi.allow(),
  importTick: Joi.string()
    .valid("Low", "Medium", "High")
    .trim()
    .required()
    .error(createHttpError.BadRequest("importTick just can be ...")),
  text: Joi.string().error(createHttpError.BadRequest("Pls Enter String Text")),
  releventRobot: Joi.allow(),
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .error(createHttpError.BadRequest("The entered email is not correct")),
});
const addAnswerToTicketSchema = Joi.object({
  parentID: Joi.string()
    .pattern(MongoIdPatern)
    .error(createHttpError.NotFound("Can not found Ticket")),
  name: Joi.string()
    .trim()
    .max(30)
    .min(3)
    .required()
    .error(createHttpError.BadRequest("Pls Enter String name >3 <30")),
  text: Joi.string().error(createHttpError.BadRequest("Pls Enter String Text")),
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .error(createHttpError.BadRequest("The entered email is not correct")),
});
module.exports = {
  addToTicketSchema,
  addAnswerToTicketSchema,
};
