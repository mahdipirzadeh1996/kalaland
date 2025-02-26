const authController = require('../../http/controller/auth/auth.controller')
const { expressValidatiorMaper } = require('../../http/middlewares/chekErrors')
const {
  registerValidator,
  loginValidator,
  vrifyValidator,
  phonenumberValidator,
  phonenumber,
} = require('../../http/validations/auth')

const router = require('express').Router()
//register
router.post('/register', expressValidatiorMaper, authController.register)
router.post(
  '/sendemail',
  vrifyValidator(),
  expressValidatiorMaper,
  authController.mehdisendEmailOtp,
)
router.get('/testemail', expressValidatiorMaper, authController.testEmail)
router.post(
  '/checkEmailOtp',
  vrifyValidator(),
  expressValidatiorMaper,
  authController.mehdicheckOtpEmial,
)
router.post(
  '/verifyemail',
  vrifyValidator(),
  expressValidatiorMaper,
  authController.getEmailOtp,
)
//router.post("/login", loginValidator(), expressValidatiorMaper, authController.login);
router.post('/getOtp', authController.getOtp)
router.post('/checkOtp', authController.checkOtp)
router.post('/validate', expressValidatiorMaper, authController.validateCode)
router.post(
  '/changePass',
  expressValidatiorMaper,
  authController.changePassword,
)
router.post(
  '/login',
  loginValidator(),
  expressValidatiorMaper,
  authController.login,
)
router.post(
  '/loginAdmin',
  loginValidator(),
  expressValidatiorMaper,
  authController.loginAdmin,
)

module.exports = {
  authRoutes: router,
}
