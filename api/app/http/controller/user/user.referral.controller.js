const moment = require("moment-jalaali");
const mongoose = require("mongoose");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const { RewardModel } = require("../../../models/reward");
const Controller = require("../controller");
const { WithdrawModel } = require("../../../models/withdraw");
const { invoiceNumberGenerator } = require("../../../utils/function");
const { PaymentModel } = require("../../../models/payments");
class UserReferralController extends Controller {
  async showAllReferral(req, res, next) {
    try {
      const refID = req.user._id;
      // const result = await UserModel.find({ referralBy }).select({
      //   frist_name: 1,
      //   createdAt: 1,
      // });
      // const count = await UserModel.find({ referralBy }).count();
      let obj = {};
      const result = await RewardModel.find({ refID });
      if (result.length < 1) {
        throw createError.NotFound(
          "No one has registered with your referral code"
        );
        // const result = await UserModel.find({ referralBy }).select({
        //   frist_name: 1,
        //   createdAt: 1,
        // });
        // obj.result=result;
      }
      let allReward = 0;
      let getReward = 0;
      for (let index = 0; index < result.length; index++) {
        if (!result[index].checkout) getReward += Number(result[index].amount);
        allReward += Number(result[index].amount);
      }
      //this.profitCalculator(result)
      console.log("getReward ", getReward);
      console.log("allReward ", allReward);
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "referral sent successfully",
          result,
          getReward,
          allReward,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async showUserReferralLink(req, res, next) {
    try {
      let result = req.user.referralLink;
      if (!result)
        throw createError.NotFound(
          "You do not have a code, please contact support"
        );
      result = `https://fxtrader.cm/register?reflink=${result}`;
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "referral sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  profitCalculator(obj) {
    const sum = obj.reduce((total, item) => {
      if (!item.checkout) {
        return total + Number(item.amount);
      }
    }, 0);
    return sum;
  }
  async reqWithdraw(req, res, next) {
    try {
      const refID = req.user._id;
      let checkout = false;
      let received = false;
      const { amount, address } = req.body;
      const result = await RewardModel.find({ refID, checkout, received });
      if (result.length < 1) {
        throw createError.NotFound("You have no gifts");
      }
      const amo = this.profitCalculator(result);
      if (Number(amount) !== amo)
        throw createError.BadRequest("The amount entered is not correct");
      //update rewardsmodel
      await this.creatWithdraw(refID, result, amo, address);
      await this.updateRewads(refID, result);
      //create withdraw index
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Withdrawal request successfully registered",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateRewads(refID, arr) {
    const ids = arr.map((item) => mongoose.Types.ObjectId(item._id));
    // const fa=['63d1801d864eeea8d7438945','63d1817d0e1552ee8a0925be']
    const result = await RewardModel.updateMany(
      { refID, _id: { $in: ids } },
      { $set: { checkout: true } }
    );
    if (result.modifiedCount == ids.length) return true;
    throw createError.InternalServerError(`Can not update Rewards`);
  }
  async creatWithdraw(userID, arr, amount, address) {
    const rewards = arr.map((item) => item._id);
    const result = await WithdrawModel.create({
      userID,
      amount,
      rewards,
      address,
      description: "Withdraw Reward",
      invoicenumber: invoiceNumberGenerator(),
      paymentDate: moment().format("YYYYMMDDHHmmssSSS"),
    });
    if (result) return true;
    throw createError.InternalServerError(`Can not save Withdraw`);
  }
  async showAllPaymentAndWithdraw(req, res, next) {
    try {
      const userID = req.user._id;
      const payments = await this.getAllPayment(userID);
      const withdraws = await this.getAllWithdraw(userID);

      // console.log("payments ", payments);
      // console.log("withdraws ", withdraws);
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "payments sent successfully",
          withdraws,
          payments,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllPayment(userID) {
    const payments = await PaymentModel.find({ userID });
    return payments;
  }
  async getAllWithdraw(userID) {
    const withdraws = await WithdrawModel.find({ userID }).populate({
      path: "rewards",
      
    });
    return withdraws;
  }
}
module.exports = {
  UserReferralController: new UserReferralController(),
};
