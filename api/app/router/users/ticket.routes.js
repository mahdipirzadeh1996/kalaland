const {UserTicketController } =require('../../http/controller/user/user.ticket.controller')
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { createTicketValidator } = require("../../http/validations/admin");
const { uploadfile } = require("../../modules/express-fileuplod");
const fileupload = require("express-fileupload");
const { mongoIdValidator } = require("../../http/validations/public");
const { uploadFile } = require('../../utils/multer');
const router = require("express").Router();
router.post(
  "/create-ticket",
  verifyAccessToken,
  createTicketValidator(),
  expressValidatorMaper,
  UserTicketController.createTicket
);
router.post(
  "/add-answer",
  verifyAccessToken,
  UserTicketController.createTicketAnswer
);
router.get("/ticket-list", verifyAccessToken, UserTicketController.showAllTicket);
router.get(
  "/ticket-list/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  UserTicketController.showOneTickGraphLookUp
);
router.get(
  "/show-oneTicket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  UserTicketController.showOneTicket
);
router.get(
  "/close/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  UserTicketController.closeOneTicket
);
router.delete(
  "/remove-ticket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  UserTicketController.removeTicket
);
router.put(
  "/edit-ticket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  UserTicketController.updateTicket
);
router.patch(
  "/edit-imagetiket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  uploadFile.single("ticket"),
  UserTicketController.uploadTicketImage
);
module.exports = {
  UserTicketRoutes: router,
};
