const { UserPaymentController } = require("../../http/controller/user/user.payment.controller");

const router =require("express").Router();
router.post("/payment", UserPaymentController.CoinpaymentsCreateTransactionOpts);
router.get("/checkpayment",UserPaymentController.verifyCoinpaymentsTransaction);
router.get("/verify/:txid",UserPaymentController.verifyCoinpaymentsTransaction);
router.get("/cancel",UserPaymentController.cancelTransaction);
module.exports={
    UserPeymentRoutes : router
}
//--------------- Shaparak - BankMelat - Pasargad - Saman ---------------------------
/**
 * 1-payment
 * 2-checkTransaction
 * 3-verifyTranaction
 */
//--------------- ZarinPal - DigiPay ---------------------------
/**
 * 1-payment
 * 2-verify
 */
