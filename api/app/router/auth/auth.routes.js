const authController = require("../../http/controller/auth/auth.controller");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const {
  registerValidator,
  loginValidator,
  verifyValidator,
  phonenumberValidator,
  phonenumber,
} = require("../../http/validations/auth");
const { verifyCookiesAccessToken } = require("../../http/middlewares/autoLogin");

const router = require("express").Router();
//register
router.post(
  "/register",
  registerValidator(),
  expressValidatorMaper,
  authController.register
);
router.post(
  "/sendemail",
  registerValidator(),
  expressValidatorMaper,
  authController.mehdisendEmailOtp
);
router.post(
  "/login",
  loginValidator(),
  expressValidatorMaper,
  authController.login
);
router.get(
  "/check",
  verifyCookiesAccessToken,
  expressValidatorMaper,
  authController.check
);
router.post("/logout", expressValidatorMaper, authController.logout);

router.get("/testemail", expressValidatorMaper, authController.testEmail);
router.post(
  "/checkEmailOtp",
  verifyValidator(),
  expressValidatorMaper,
  authController.mehdicheckOtpEmail
);
router.post(
  "/verifyemail",
  verifyValidator(),
  expressValidatorMaper,
  authController.getEmailOtp
);
//router.post("/login", loginValidator(), expressValidatorMaper, authController.login);
router.post("/getOtp", authController.getOtp);
router.post("/checkOtp", authController.checkOtp);
router.post("/validate", expressValidatorMaper, authController.validateCode);
router.post(
  "/changePass",
  expressValidatorMaper,
  authController.changePassword
);
router.post(
  "/loginAdmin",
  loginValidator(),
  expressValidatorMaper,
  authController.loginAdmin
);

module.exports = {
  authRoutes: router,
};
