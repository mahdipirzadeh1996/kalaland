const fileUpload = require("express-fileupload");
const userController = require("../../http/controller/user/user.controller");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const {
  imageValidator,
  createBuyPackValidator,
  changePasswordValidator,
} = require("../../http/validations/user");
const { uploadfile } = require("../../modules/express-fileuplod");
const { upload_multer } = require("../../modules/mullter");
const { mongoIdValidator } = require("../../http/validations/public");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const authController = require("../../http/controller/auth/auth.controller");
const router = require("express").Router();
const { UserTicketRoutes } = require("./ticket.routes");
const { UserBasketRoutes } = require("./basket.routes");
const { UserNotifRoutes } = require("./notif.routes");
const { UserPeymentRoutes } = require("./payment.routes");
const { UserPackageRoutes } = require("./package.routes");
const { UserGoogleAuthRoutes } = require("./googleAuth.routes");
const { UserReferralRoutes } = require("./referral.routes");
router.use("/ticket", UserTicketRoutes);
router.use("/notif", UserNotifRoutes);
router.use('/basket',UserBasketRoutes)
router.use('/pay',verifyAccessToken,UserPeymentRoutes)
router.use('/referral',UserReferralRoutes)
router.use('/googleauth',verifyAccessToken,UserGoogleAuthRoutes)
router.use("/package",verifyAccessToken, UserPackageRoutes)
router.post("/getOtpSendMassage", userController.getOtpSendMassage);
router.post("/getOtp", authController.getOtp);
router.post("/checkOtp", authController.checkOtp);
router.post("/refresh-token", userController.refreshToken);
router.post("/changepassword/", verifyAccessToken, changePasswordValidator(), expressValidatorMaper, userController.changePassword);
//------------SHOW profile-----------
router.get("/profile", verifyAccessToken, userController.getProfile);
router.post("/profile", verifyAccessToken, userController.updateUser);
router.post("/profile-image", verifyAccessToken, upload_multer.single("image"), imageValidator(), expressValidatorMaper, userController.uploadProfileImage);
//---------------USER PURCHASES-----------------
router.post("/create-buypack", verifyAccessToken, createBuyPackValidator(), expressValidatorMaper, userController.createBuyPack);
router.get("/buypack-list", verifyAccessToken, userController.showAllBuyPack);
router.get("/buypack-list/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, userController.showOneBuyPack);
router.get("/buypack-list-user", verifyAccessToken, userController.showOneBuyPackOfUser);
router.delete("/remove-buypack/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, userController.removeBuyPack);
router.put("/edit-buypack/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, userController.updateBuyPack);
router.patch("/edit-imagebuypack/:id", verifyAccessToken, fileUpload(), uploadfile, mongoIdValidator(), expressValidatorMaper, userController.uploadBuyPackImage);

module.exports = {
  userRoutes: router,
};
