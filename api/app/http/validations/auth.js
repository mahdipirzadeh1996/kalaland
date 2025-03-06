const { body } = require("express-validator");
const { UserModel } = require("../../models/users");

const regex = /^[\u0600-\u06FFa-zA-Z]+$/;
function registerValidator() {
  return [
    body("userData.name")
      .isLength({ min: 3, max: 10 })
      .withMessage("نام باید بین 3 تا 10 کاراکتر باشد!")
      .matches(regex)
      .withMessage("نام به درستی وارد نشده است!"),

    body("userData.family")
      .isLength({ min: 3, max: 10 })
      .withMessage("نام خانوادگی باید بین 3 تا 10 کاراکتر باشد!")
      .matches(regex)
      .withMessage("نام خانوادگی به درستی وارد نشده است!"),

    body("userData.email")
      .isEmail()
      .withMessage("ایمیل را به درستی وارد کنید!")
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw new Error("این ایمیل قبلا ثبت شده است!");
      }),

    body("userData.mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل را به درستی وارد کنید!")
      .custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw new Error("این شماره موبایل قبلا ثبت شده است!");
      }),

    body("userData.password")
      .isLength({ min: 4, max: 16 })
      .withMessage("گذرواژه باید بین ۴ تا ۱۶ کاراکتر باشد!")
      .custom((value, { req }) => {
        if (value !== req.body.userData.confirm_password) {
          throw new Error("گذرواژه ها با هم مطابقت ندارند!");
        }
        return true;
      }),
  ];
}
function loginValidator() {
  return [
    body("email").isEmail().withMessage("ایمیل را به درستی وارد کنید!"),
    body("password")
      .isLength({ min: 4, max: 16 })
      .withMessage("گذرواژه باید بین ۴ تا ۱۶ کاراکتر باشد!"),
  ];
}
function verifyValidator() {
  return [body("email").isEmail().withMessage("ایمیل را به درستی وارد کنید!")];
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
  verifyValidator,
  phonenumber,
  phonenumberValidator,
};
