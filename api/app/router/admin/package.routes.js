const packageController = require("../../http/controller/admin/admin.package.controller");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { createPackageValidator } = require("../../http/validations/package");
const { uploadfile } = require("../../modules/express-fileuplod");
const fileupload = require("express-fileupload");
const { mongoIdValidator } = require("../../http/validations/public");
const { PackageFileRoutes } = require("./packages.upfile.routes");
const router = require("express").Router();
router.use('/upfile',PackageFileRoutes)
//router.post("/create",createPackageValidator(),expressValidatorMaper,packageController.creatPackage)
router.post("/addPlan", verifyAccessToken, expressValidatorMaper, packageController.creatPackage);
router.get("/list", verifyAccessToken, packageController.getAllPackage);
router.get("/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, packageController.showOnePackage);
router.delete("/remove/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, packageController.removePackageByID);
router.put("/edit/:id", verifyAccessToken, mongoIdValidator(), expressValidatorMaper, packageController.updatPackage);
router.patch("/edit-imagepack/:id", verifyAccessToken, fileupload(), uploadfile, mongoIdValidator(), expressValidatorMaper, packageController.updateImage);
module.exports = {
    PackageRoutes: router
}