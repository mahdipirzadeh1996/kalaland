const newsController = require("../../http/controller/admin/admin.news.controller");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { createNotifValidator, createTicketValidator, createKycValidator } = require("../../http/validations/admin");
const { uploadfile } = require("../../modules/express-fileuplod");
const fileupload = require("express-fileupload");
const { mongoIdValidator } = require("../../http/validations/public");
const router = require("express").Router();
const { upload_multer } = require("../../modules/mullter");
const {
    imageValidator
} = require("../../http/validations/user");
const { uploadFile } = require("../../utils/multer");

//          ----------------NOTIF------------------

router.post("/create-news", verifyAccessToken,uploadFile.single("image"), newsController.createNews);
router.get("/news-list", verifyAccessToken, newsController.showAllNews);
router.get("/news-list/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, newsController.showOneNews);
router.get("/news-list-user", verifyAccessToken, newsController.showOneNewsOfUser);
router.delete("/remove-news/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, newsController.removeNews);
router.put("/edit-news/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, newsController.updateNews);
router.post("/news-image", verifyAccessToken, upload_multer.single("image"), imageValidator(), expressValidatorMaper, newsController.uploadNewsImage);
module.exports = {
    NewsRouter: router
}