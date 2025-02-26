const {
  UserPackageController,
} = require("../../http/controller/user/user.package.controller");
const { expressValidatiorMaper } = require("../../http/middlewares/chekErrors");
const { mongoIdValidator } = require("../../http/validations/public");
const router = require("express").Router();
//          ----------------NOTIF------------------
router.get("/package-list", UserPackageController.showAllPackage);
router.get(
  "/package-list/:id",
  mongoIdValidator(),
  expressValidatiorMaper,
  UserPackageController.showOnePackage
);
router.patch(
  "/remove-package/:id",
  mongoIdValidator(),
  expressValidatiorMaper,
  UserPackageController.removePackage
);
router.put(
  "/edit-package/:id",
  mongoIdValidator(),
  expressValidatiorMaper,
  UserPackageController.updatePackage
);
module.exports = {
  UserPackageRoutes: router,
};
