const { body } = require("express-validator");
const { UserModel } = require("../../models/users");
function registerValidator() {
  return [
    body("username")
      .isLength({ min: 4, max: 25 })
      .custom(async (value, ctx) => {
        if (value) {
          const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
          if (usernameRegex.test(value)) {
            const user = await UserModel.findOne({ username: value });
            if (user) throw "username exist";
            return true;
          }
          throw "user name is not valid";
        }
        throw "user name can not be empty";
      }),
    body("email")
      .isEmail()
      .withMessage("enter email corectly")
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw "email exist";
        return true;
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("enter mobile")
      .custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw "mobile exist";
        return true;
      }),
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
function loginValidator() {
  return [
    body("email").isEmail().withMessage("Enter email correctly!!!"),
    body("password")
      .isLength({ min: 4, max: 16 })
      .withMessage("Password length should be between 4 - 16 !!!"),
  ];
}
function vrifyValidator() {
  return [body("email").isEmail().withMessage("Enter email correctly!!!")];
}
function phonenumber(inputtxt) {
  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if (inputtxt.value.match(phoneno)) {
    return true;
  } else {
    alert("message");
    return false;
  }
}
function phonenumberValidator() {
  return [body("mobile").isMobilePhone().withMessage("enter Phone corectly")];
}
module.exports = {
  registerValidator,
  loginValidator,
  vrifyValidator,
  phonenumber,
  phonenumberValidator
};
