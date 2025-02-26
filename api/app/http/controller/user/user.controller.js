const { UserModel } = require("../../../models/users");
const { UsrePackModel } = require("../../../models/userpack");
const createError = require("http-errors");
const { hashString } = require("../../../modules/function");
const axios = require('axios');
const { SignAccessToken, SignRefreshToken, VerifyRefreshToken } = require("../../middlewares/functions");
const { RandomNumberGenerator } = require("../../../utils/function");

module.exports = new (class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      let data = { ...req.body };
      const userId = req.user._id;
      let fields = [
        "frist_name",
        "statusActive",
        "statusEmail",
        "statustwoFactir",
      ];
      let badValues = ["", " ", null, NaN, undefined, -1];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const result = await UserModel.updateOne({ _id: userId }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "update done",
        });
      }
      throw { status: 400, message: "can not update" };
    } catch (error) {
      next(error);
    }
  }
  async uploadProfileImage(req, res, next) {
    try {
      console.log(req.file);
      if (Object.keys(req.file).length == 0)
        throw { status: 400, message: "PLZ upload img" };
      const userId = req.user._id;
      const filePath = req.file?.path.replace(/[\\\\]/gm, "/").substring(7);
      console.log(filePath);
      const result = await UserModel.updateOne(
        { _id: userId },
        { $set: { avatar: filePath } }
      );
      if (result.modifiedCount == 0)
        throw { status: 400, message: "can not upload img" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "upload img done",
      });
    } catch (error) {
      next(error);
    }
  }
  async createBuyPack(req, res, next) {
    try {
      console.log(req)
      const userName = JSON.stringify(req.user.username);
      
      console.log(req.user._id);
      const {
        packId,
        trades,
        overallprofit,
        transhash,
        startat,
        loginId,
        maxpos,
        lotsize,
        image,
      } = req.body;
      console.log(packId)
      const result = await UsrePackModel.create({
        username: userName,
        packId,
        trades,
        overallprofit,
        transhash,
        startat,
        loginId,
        maxpos,
        lotsize,
        image,
      });
      if (!result) throw { status: 400, message: "can not add BuyPack" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "create BuyPack",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async showAllBuyPack(req, res, next) {
    try {
      const result = await UsrePackModel.find();
      if (!result) throw { status: 404, message: "can not found Pack" };
      for (const resa of result) {
        resa.image =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          resa.image.replace(/[\\\\]/gm, "/");
      }
      return res.status(200).json({
        status: 200,
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async showOneBuyPack(req, res, next) {
    try {
      const BuyPackId = req.params.id;
      const username = JSON.stringify(req.user.username);
      const result = await UsrePackModel.findOne({ _id: BuyPackId, username });
      if (!result) throw { status: 404, message: "can not found Pack" };
      result["image"] =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        result["image"].replace(/[\\\\]/gm, "/");
      return res.status(200).json({
        status: 200,
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async showOneBuyPackOfUser(req, res, next) {
    try {
      const userName = JSON.stringify(req.user.username);
      const result = await UsrePackModel.find({ username: userName });
      if (!result) throw { status: 404, message: "can not found Pack" };
      for (const resa of result) {
        resa.image =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          resa.image.replace(/[\\\\]/gm, "/");
      }
      return res.status(200).json({
        status: 200,
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBuyPack(req, res, next) {
    try {
      const BuyPackId = req.params.id;
      const pakage = await UsrePackModel.findOne({
        _id: BuyPackId,
        username: JSON.stringify(req.user.username),
      });
      if (!pakage) throw { status: 404, message: "can not found BuyPack" };
      let fields = [
        "overallprofit",
        "trades",
        "botstatus",
        "loginId",
        "maxpos",
        "lotsize",
      ];
      let badValues = ["", " ", null, NaN, undefined, -1];
      let data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const result = await UsrePackModel.updateOne(
        { _id: BuyPackId, username: JSON.stringify(req.user.username) },
        { $set: data }
      );
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "update BuyPack done-- " + BuyPackId,
          result,
        });
      }
      throw { status: 400, message: "can not update BuyPack" };
    } catch (error) {
      next(error);
    }
  }
  async removeBuyPack(req, res, next) {
    try {
      const BuyPackId = req.params.id;
      const result = await UsrePackModel.find({
        _id: BuyPackId,
        username: JSON.stringify(req.user.username),
      });
      if (!result) throw { status: 404, message: "can not found BuyPack" };
      const deleteNotif = await UsrePackModel.deleteOne({
        _id: BuyPackId,
        username: JSON.stringify(req.user.username),
      });
      if (deleteNotif.deletedCount == 0)
        throw { status: 400, message: "can not delete BuyPack" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "delete BuyPack done",
      });
    } catch (error) {
      next(error);
    }
  }
  async uploadBuyPackImage(req, res, next) {
    try {
      const { image } = req.body;
      const BuyPackId = req.params.id;
      const pakages = await UsrePackModel.find({ _id: BuyPackId });
      if (!pakages) throw { status: 404, message: "can not found BuyPack" };
      const result = await UsrePackModel.updateOne(
        { _id: BuyPackId, username: JSON.stringify(req.user.username) },
        { $set: { image } }
      );
      if (result.modifiedCount == 0)
        throw { status: 400, message: "can not upload img" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "upload img done",
      });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    try {
      const _id = req.user._id;
      const { mobile, code } = req.body;
      const phone =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      /**
       *Valid formats:
        (123) 456-7890
        (123)456-7890
        123-456-7890
        123.456.7890
        1234567890
        +31636363634
        075-63546725
       */
      if (!phone.test(mobile))
        throw createError.Unauthorized("enter mobile corectly");
      let regexCode = /^[0-9]{4}$/;
      if (!regexCode.test(code))
        throw createError.Unauthorized("enter code corectly");

      const user = await UserModel.findOne({ mobile, _id });
      console.log(user)
      if (!user) throw createError.NotFound("User Not Found");
      if (user.otp.code != code)
        throw createError.Unauthorized("The code is not correct");
      let { password, confirm_password } = req.body;
      password = hashString(password);
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("Your code has expired");
      const token = 'Bearer ' + await SignAccessToken(_id);
      const newRefreshToken = 'Bearer ' + await SignRefreshToken(_id);
      const result = await UserModel.updateOne(
        { _id }, { mobile },
        { $set: { password, token } }
      );
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "update done",
          data: {
            token,
            refreshToken: newRefreshToken
          },
        });
      }
      throw { status: 400, message: "can not update" };
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await VerifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile });
      const accessToken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refreshToken: newRefreshToken
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async getOtpSendMassage(req, res, next) {
    try {
      let Kavenegar = require('kavenegar');
      const code = RandomNumberGenerator();
      var api = Kavenegar.KavenegarApi({
        apikey: process.env.KAVENEGAR_API_KEY
      }); 
      api.VerifyLookup({
        receptor: "09379300432",
        token: code,
        template: "verify"
      }, function (response, status) {
        console.log(response);
        console.log(status);
      });


      const { mobile } = req.body;
      console.log(mobile);
      const phone =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      /**
       *Valid formats:
        (123) 456-7890
        (123)456-7890
        123-456-7890
        123.456.7890
        1234567890
        +31636363634
        075-63546725
       */
      if (!phone.test(mobile))
        throw createError.Unauthorized("enter mobile corectly");

      console.log(mobile);
      //const code = RandomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createError.Unauthorized("can not login");
      return res.status(200).send({
        data: {
          statuseCode: 200,
          message: "Code Send",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
})();
