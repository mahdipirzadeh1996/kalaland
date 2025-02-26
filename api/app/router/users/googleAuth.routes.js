const { UserAuthenticatorController } = require("../../http/controller/user/user.googleAuthenticator");


const router =require("express").Router();
router.post("/create", UserAuthenticatorController.createGoogleAuthenticator);
router.post("/chaek", UserAuthenticatorController.cheakGoogleAuthenticator);
router.post("/disable", UserAuthenticatorController.disableGoogleAuthenticator);
// router.get("/checkpayment",UserAuthenticatorController.verifyCoinpaymentsTransaction);
// router.get("/verify/:txid",UserAuthenticatorController.verifyCoinpaymentsTransaction);
// router.get("/cancel",UserAuthenticatorController.cancelTransaction);
module.exports={
    UserGoogleAuthRoutes : router
}