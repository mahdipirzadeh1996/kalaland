//uploadFile.single("image")
const { expressValidatiorMaper } = require("../../http/middlewares/chekErrors");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { PackageFileController } = require("../../http/controller/admin/admin.package.file");
const { mongoIdValidator } = require("../../http/validations/public");
const {uploadFile } = require("../../utils/multerNew");
const router = require("express").Router();
router.patch("/create/:id",verifyAccessToken,mongoIdValidator(), expressValidatiorMaper,uploadFile.single("fileAddress"), PackageFileController.createFile);

module.exports = {
    PackageFileRoutes: router
}