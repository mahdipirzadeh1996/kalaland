const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { createNotifValidator, createTicketValidator, createKycValidator } = require("../../http/validations/admin");
const { uploadfile } = require("../../modules/express-fileuplod");
const fileupload = require("express-fileupload");
const { mongoIdValidator } = require("../../http/validations/public");
const { AdminNotifController } = require("../../http/controller/admin/admin.notif.controller");
const router = require("express").Router();
//          ----------------NOTIF------------------

router.post("/create-notif", verifyAccessToken, createNotifValidator(), expressValidatorMaper, AdminNotifController.createNotif);
router.get("/notif-list", verifyAccessToken, AdminNotifController.showAllNotif);
router.get("/notif-list/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, AdminNotifController.showOneNotif);
router.get("/notif-list-user", verifyAccessToken, AdminNotifController.showOneNotifOfUser);
router.delete("/remove-notif/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, AdminNotifController.removeNotif);
router.put("/edit-notif/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, AdminNotifController.updateNotif);
module.exports = {
    NotifRoutes: router
}