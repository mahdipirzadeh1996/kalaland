const {UserNotifController} = require("../../http/controller/user/user.notif.controller");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { mongoIdValidator } = require("../../http/validations/public");
const router =require("express").Router();
//          ----------------NOTIF------------------
router.get("/notif-list",verifyAccessToken,UserNotifController.showAllNotif);
router.get("/notif-list/:id",verifyAccessToken,mongoIdValidator(),expressValidatorMaper,UserNotifController.showOneNotif);
router.delete("/remove-notif/:id",verifyAccessToken,mongoIdValidator(),expressValidatorMaper,UserNotifController.removeNotif);
router.put("/edit-notif/:id",verifyAccessToken,mongoIdValidator(),expressValidatorMaper,UserNotifController.updateNotif);
module.exports={
    UserNotifRoutes : router
}