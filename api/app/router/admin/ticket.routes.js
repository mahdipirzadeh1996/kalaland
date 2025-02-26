const router = require('express').Router()

const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatiorMaper } = require('../../http/middlewares/chekErrors')
const { mongoIdValidator } = require('../../http/validations/public')
const {
  AdminTicketController,
} = require('../../http/controller/admin/admin.ticket.controller')
const { uploadFile } = require('../../utils/multer')

router.post('/add', verifyAccessToken, AdminTicketController.createTicket)

router.post(
  '/answer-ticket',
  verifyAccessToken,
  AdminTicketController.answerTicket,
)

router.get(
  '/one-ticket/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminTicketController.showOneTicketById,
)

router.get(
  '/one-first-admin-ticket/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminTicketController.showFirstAdminTicket,
)

router.put(
  '/edit-ticket/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminTicketController.updateTicket,
)

router.delete(
  '/remove-ticket/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminTicketController.removeTicket,
)

router.patch(
  '/close-ticket/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminTicketController.closeTicket,
)

router.get(
  '/all-conversation',
  verifyAccessToken,
  AdminTicketController.showAllTicketConversation,
)

router.get(
  '/one-conversation/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminTicketController.showOneTicketConversation,
)

router.patch(
  '/image/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  uploadFile.single('ticket'),
  AdminTicketController.uploadTicketImage,
)

router.get(
  '/all-open',
  verifyAccessToken,
  AdminTicketController.showAllOpenTicket,
)

// router.get(
//   "/all-parent",
//   verifyAccessToken,
//   AdminTicketController.showAllParentTicket
// );

// router.get(
//   "/all-openparent",
//   verifyAccessToken,
//   AdminTicketController.showAllOpenParentTicket
// );

// router.get(
//   "/ticket-list",
//   verifyAccessToken,
//   AdminTicketController.showAllTicket
// );
// router.get(
//   "/ticket-list/:id",
//   verifyAccessToken,
//   mongoIdValidator(),
//   expressValidatiorMaper,
//   AdminTicketController.showOneTicket
// );
// router.get(
//   "/ticketparent-list",
//   verifyAccessToken,
//   AdminTicketController.showAllParentTicket
// );
// router.get(
//   "/ticket-list-user",
//   verifyAccessToken,
//   AdminTicketController.showOneTicketOfUser
// );

module.exports = {
  TicketAdminRoutes: router,
}
