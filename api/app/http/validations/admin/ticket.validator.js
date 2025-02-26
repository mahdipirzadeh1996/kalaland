const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const addTicketSchema = Joi.object({
    parentId: Joi.string()
    .pattern(MongoIdPatern)
    .error(createHttpError.NotFound("Can not found Ticket")),
    text: Joi.string().error(createHttpError.BadRequest("Pls Enter String Text")),
    });
module.exports = {
    addTicketSchema,
};
