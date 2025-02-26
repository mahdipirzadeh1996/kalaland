const {UserNotifController} = require("../../http/controller/user/user.notif.controller");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatiorMaper } = require("../../http/middlewares/chekErrors");
const { mongoIdValidator } = require("../../http/validations/public");
const router =require("express").Router();
//          ----------------NOTIF------------------
router.get("/notif-list",verifyAccessToken,UserNotifController.showAllNotif);
router.get("/notif-list/:id",verifyAccessToken,mongoIdValidator(),expressValidatiorMaper,UserNotifController.showOneNotif);
router.delete("/remove-notif/:id",verifyAccessToken,mongoIdValidator(),expressValidatiorMaper,UserNotifController.removeNotif);
router.put("/edit-notif/:id",verifyAccessToken,mongoIdValidator(),expressValidatiorMaper,UserNotifController.updateNotif);
module.exports={
    UserNotifRoutes : router
}