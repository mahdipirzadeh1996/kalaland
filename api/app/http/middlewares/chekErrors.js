const { validationResult } = require("express-validator");

function expressValidatorMaper(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const messages = result.array().reduce((acc, err) => {
      acc[err.param] = err.msg;
      return acc;
    }, {});
    return res.status(400).json({
      status: 400,
      success: false,
      messages,
    });
  }
  next();
}

module.exports = { expressValidatorMaper };
