const {
  UserReferralController,
} = require("../../http/controller/user/user.referral.controller");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { mongoIdValidator } = require("../../http/validations/public");
const router = require("express").Router();
//          ----------------NOTIF------------------
router.get("/list", verifyAccessToken, UserReferralController.showAllReferral);
router.get(
  "/user",
  verifyAccessToken,
  UserReferralController.showUserReferralLink
);
router.post(
  "/withdraw",
  verifyAccessToken,
  UserReferralController.reqWithdraw
);
router.get(
  "/payments",
  verifyAccessToken,
  UserReferralController.showAllPaymentAndWithdraw
);
// router.delete("/remove-notif/:id",verifyAccessToken,mongoIdValidator(),expressValidatorMaper,UserReferralController.removeNotif);
// router.put("/edit-notif/:id",verifyAccessToken,mongoIdValidator(),expressValidatorMaper,UserReferralController.updateNotif);
module.exports = {
  UserReferralRoutes: router,
};
