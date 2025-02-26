const { body } = require("express-validator");
const path = require("path");
function imageValidator() {
  return [
    body("image").custom((value, { req }) => {
      if (Object.keys(req.file).lenght == 0) throw "chose a img";

      const ext = path.extname(req.file.originalname).toLocaleLowerCase();
      const extx = [".png", ".jpg", ".jpeg", ".gif", ".webp", 'PNG'];
      if (!extx.includes(ext)) throw "format is incorect";

      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) throw "max size iz 2 mgb";

      return true;
    })
  ]
}
function createBuyPackValidator() {
  return [
    body("packId").notEmpty().withMessage("enter packId"),
    body("trades").notEmpty().withMessage("plz inter trades"),
    body("overallprofit").notEmpty().withMessage("plz inter overallprofit"),
    body("transhash").notEmpty().withMessage("plz inter transhash"),
    body("loginId").notEmpty().withMessage("plz inter loginId"),
    body("maxpos").notEmpty().withMessage("enter email maxpos"),
    body("lotsize").notEmpty().withMessage("plz inter lotsize"),
    body("startat").notEmpty().withMessage("plz inter startat")
  ]
}
function changePasswordValidator() {
  return [
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password 6-16 ")
      .custom((value, ctx) => {
        if (!value) throw " password is empty";
        if (value !== ctx?.req?.body?.confirm_password)
          throw "passs and confirm_password is not equle";
        return true;
      }),
  ];
}
module.exports = {
  imageValidator,
  createBuyPackValidator,
  changePasswordValidator
}