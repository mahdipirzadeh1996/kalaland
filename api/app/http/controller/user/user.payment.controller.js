const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const { UserModel } = require("../../../models/users");
const Controller = require("../controller");
const {
  getUserBasket,
  invoiceNumberGenerator,
} = require("../../../utils/function");
const { default: axios } = require("axios");
const { PaymentModel } = require("../../../models/payments");
const moment = require("moment-jalaali");
const { body } = require("express-validator");
const Coinpayments = require("coinpayments");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const qrcode = require("qrcode");
const { UsrePackModel } = require("../../../models/userpack");
const userpack = require("../../../models/userpack");
class UserPaymentController extends Controller {
  async zaribpalPaymentGatway(req, res, next) {
    try {
      const user = req.user;
      if (user.basket.package.length == 0)
        throw createError.NotFound("Your shopping cart is empty");
      const basket = await getUserBasket(user._id);
      if (!basket?.payDetail?.productAmount)
        throw createError.NotFound("Your shopping cart is empty");
      const zarinpal_panel =
        "https://api.zarinpal.com/pg/v4/payment/request.json";
      const zarinPalGetewayURL = "https://www.zarinpal.com/pg/StartPay";
      const description = "Payment for the purchase of the robot";
      const amount = basket.payDetail.totalProductAmount;
      const zarinpal_option = {
        merchant_id: 1526,
        amount,
        description,
        metadata: {
          mobile: user.email,
          email: user.mobile,
        },
        callback_url: "http://localhost:3030/api/user/pay/verify",
      };
      const RequstResult = await axios
        .post(zarinpal_panel, zarinpal_option)
        .then((result) => result.data);
      const { authority, code } = RequstResult.data;
      const payment = await PaymentModel.create({
        amount,
        description,
        userID: user._id,
        invoicenumber: invoiceNumberGenerator(),
        basket,
        paymentDate: moment().format("YYYYMMDDHHmmssSSS"),
      });
      if (payment)
        if (code == 100 && authority) {
          return res.json({
            code,
            getewayURL: `${zarinPalGetewayURL}/${authority}`,
          });
        }
      throw createError.BadRequest("The parameters are not correct");
    } catch (error) {
      next(error);
    }
  }
  async zarinpalVerify(req, res, next) {
    try {
      const user = req.user;
      const { Authority: authority } = req.query;
      const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
      const payment = await PaymentModel.findOne({
        _id: user._id,
        authority,
        verify: false,
      });
      if (!payment) throw createError.NotFound("You have no invoices to pay");
      if (payment.verify)
        throw createError.BadRequest("The transaction is repeated");
      const verifyBody = JSON.stringify({
        authority,
        amount: payment.amount,
        merchant_id: 1235,
      });
      const verfuResult = await fetch(verifyURL, {
        method: "POST",
        headrs: {
          "Content-Type": "application/json",
        },
        body: verifyBody,
      }).then((result) => result.json());
      if (verfuResult.data.code == 100) {
        const paymentUpdate = await PaymentModel.updateOne(
          { authority, transactionHash: undefined },
          {
            $set: {
              refID: verfuResult.data.ref_id,
              transactionHash: verfuResult.data.card_hash,
              verify: true,
            },
          }
        );
        const userData = await UserModel.findById(user._id);
        const userUpdate = await UserModel.updateOne(
          { _id: user._id },
          {
            $set: {
              plans: [
                ...(payment?.basket?.payDetail?.productIds || []),
                ...userData.plans,
              ],
              basket: {
                package: [],
              },
            },
          }
        );
        if (paymentUpdate.modifiedCount > 0) {
          return res.status(HttpSatatus.OK).json({
            data: {
              statusCode: HttpSatatus.OK,
              message: "Payment was successful",
            },
          });
        }
        throw createError.InternalServerError(
          `The payment was successful but the information was not saved in the database. Please save these two parameters refID: ${verfuResult.data.ref_id} txhash: ${verfuResult.data.ref_id}`
        );
      }
      throw createError.BadRequest("Payment was not made");
    } catch (error) {
      next(error);
    }
  }
  async CoinpaymentsCreateTransactionOpts(req, res, next) {
    try {
      const user = req.user;
      // if (user.basket.package.length == 0)
      //   throw createError.NotFound("Your shopping cart is empty");
      const basket = await getUserBasket(user._id);
      if (!basket?.payDetail?.productAmount)
        throw createError.NotFound("Your shopping cart is empty");
      const amount = basket.payDetail.totalProductAmount;
      let key = process.env.COINPAYMENT_KEY;
      let secret = process.env.COINPAYMENT_SECRET;
      const client = new Coinpayments({
        key,
        secret,
      });
      let TransactionOpts = {
        currency1: "USDT.TRC20",
        currency2: "USDT.TRC20",
        address: "TEcqZa3QNN9CPB42D6QAqWjayBiSpWGJCw",
        amount: Number(2),
        buyer_email: user.email,
        success_url: "http://localhost:3030/api/user/pay/verify",
        cancel_url: "http://localhost:3030/api/user/pay/cancel",
      };
      const result = await client.createTransaction(TransactionOpts);
      if (result) {
        const description = "Payment for the purchase of the robot";
        const txn_id = result.txn_id;
        const news = `Address:${result.address}?amount=${2}`;
        let myQrCode = await qrcode.toDataURL(news, { type: "image/png" });
        const payment = await PaymentModel.create({
          amount,
          description,
          address: result.address,
          txn_id,
          userID: user._id,
          invoicenumber: invoiceNumberGenerator(),
          amount: result.amount,
          basket,
          myQrCode,
          paymentDate: moment().format("YYYYMMDDHHmmssSSS"),
        });
        if (payment)
          return res.status(HttpSatatus.CREATED).json({
            data: {
              statusCode: HttpSatatus.CREATED,
              message: "Payment made successfully",
              result,
              myQrCode,
            },
          });
        throw createError.InternalServerError(
          `The payment was successful but the information was not saved in the database`
        );
      }
    } catch (error) {
      next(error);
    }
  }
  async verifyCoinpaymentsTransaction(req, res, next) {
    try {
      const { txid } = req.params;
      const user = req.user;
      const payment = await PaymentModel.findOne({ userID: user._id, txid });
      if (!payment) throw createError.NotFound("You have no invoices to pay");
      if (payment.status)
        throw createError.BadRequest("The transaction is repeated");
      let CoinpaymentsGetTxOpts = {
        txid,
      };
      const key = process.env.COINPAYMENT_KEY;
      const secret = process.env.COINPAYMENT_SECRET;
      const client = new Coinpayments({
        key,
        secret,
      });
      const result = await client.getTx(CoinpaymentsGetTxOpts);
      if (result.status != 100) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            message: result.status_text,
            status: result.status,
            result,
          },
        });
      }
      const updatePayment = await PaymentModel.updateOne(
        { txid },
        { $set: { status: result.status } }
      );
      let packadded = 0;
      let allUeserPack = 0;
      for (let i = 0; i < payment.basket.productDetail.length; i++) {
        allUeserPack += payment.basket.productDetail[i].basketCount;
        for (
          let index = 0;
          index < payment.basket.productDetail[i].basketCount;
          index++
        ) {
          let result = this.add(user._id, payment.basket.productDetail[i]);
          if (result) packadded++;
        }
      }
      if (updatePayment.modifiedCount > 0 && packadded == allUeserPack)
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            message: "Payment update successfully",
          },
        });
    } catch (error) {
      next(error);
    }
  }
  async verifyCoinpaymentsTransactionSuccessful(req, res, next) {
    try {
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          message: "Payment was successful",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async cancelTransaction(req, res, next) {
    try {
      const payment = await PaymentModel.findOne({ isDeleted: false });
      if (!payment) throw createError.NotFound("Your payment cart is empty");
      const deletePayment = await PaymentModel.updateOne(
        { _id: payment._id },
        { $set: { isDeleted: true } }
      );
      if (deletePayment.modifiedCount > 0)
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            message: "Payment delete successfully",
          },
        });
      throw createError.InternalServerError("Nadome");
    } catch (error) {
      next(error);
    }
  }
  async cheack(req, res, next) {
    try {
      const { txid } = req.params;
      const user = req.user;
      const payment = await PaymentModel.findOne({ userID: user._id, txid });
      if (!payment) throw createError.NotFound("You have no invoices to pay");
      if (payment.status)
        throw createError.BadRequest("The transaction is repeated");
      let packadded = 0;
      let allUeserPack = 0;
      for (let i = 0; i < payment.basket.productDetail.length; i++) {
        allUeserPack += payment.basket.productDetail[i].basketCount;
        for (
          let index = 0;
          index < payment.basket.productDetail[i].basketCount;
          index++
        ) {
          let result = this.add(user._id, payment.basket.productDetail[i]);
          if (result) packadded++;
        }
      }
      if (packadded == allUeserPack)
        return res.status(HttpSatatus.OK).json({
          data: {
            message: "come on let go",
          },
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async add(userID, object) {
    const UserPackages = await UsrePackModel.create({
      userID,
      startat: Date.now().toString(),
      endat: (object['expreDate'].toUTCString() + Number(Date.now())).toString(),
      botstatus: true,
      admincheck: true,
      packageID: object._id,
      name: object["name"],
      type: object["type"],
      price: object["price"],
      discount: object["discount"],
      inventoryLimit: object["inventoryLimit"],
      dateVS: object["dateVS"],
      statusSupport: object["statusSupport"],
      statusVS: object["statusVS"],
      statusAccSt: object["statusVS"],
    });
    if (UserPackages) return true;
    return false;
  }
}
module.exports = {
  UserPaymentController: new UserPaymentController(),
};
