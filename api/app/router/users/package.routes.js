const {
  UserPackageController,
} = require("../../http/controller/user/user.package.controller");
const { expressValidatorMaper } = require("../../http/middlewares/chekErrors");
const { mongoIdValidator } = require("../../http/validations/public");
const router = require("express").Router();
//          ----------------NOTIF------------------
router.get("/package-list", UserPackageController.showAllPackage);
router.get(
  "/package-list/:id",
  mongoIdValidator(),
  expressValidatorMaper,
  UserPackageController.showOnePackage
);
router.patch(
  "/remove-package/:id",
  mongoIdValidator(),
  expressValidatorMaper,
  UserPackageController.removePackage
);
router.put(
  "/edit-package/:id",
  mongoIdValidator(),
  expressValidatorMaper,
  UserPackageController.updatePackage
);
module.exports = {
  UserPackageRoutes: router,
};
