const { adminRoutes } = require("./admin/admin.routes");
const { authRoutes } = require("./auth/auth.routes");
const { DeveloperApiRouter } = require("./developer/developer.routes");
const { userRoutes } = require("./users/user.routes");
const router = require("express").Router();
router.use("/admin", adminRoutes)
router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/developer", DeveloperApiRouter)



module.exports = {
    AllRoutes: router
}