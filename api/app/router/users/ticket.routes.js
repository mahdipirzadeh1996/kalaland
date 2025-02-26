const {UserTicketController } =require('../../http/controller/user/user.ticket.controller')
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatiorMaper } = require("../../http/middlewares/chekErrors");
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
  expressValidatiorMaper,
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
  expressValidatiorMaper,
  UserTicketController.showOneTickGraphLookUp
);
router.get(
  "/show-oneTicket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  UserTicketController.showOneTicket
);
router.get(
  "/close/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  UserTicketController.closeOneTicket
);
router.delete(
  "/remove-ticket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  UserTicketController.removeTicket
);
router.put(
  "/edit-ticket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  UserTicketController.updateTicket
);
router.patch(
  "/edit-imagetiket/:id",
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  uploadFile.single("ticket"),
  UserTicketController.uploadTicketImage
);
module.exports = {
  UserTicketRoutes: router,
};
