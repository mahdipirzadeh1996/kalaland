const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const Controller = require("../controller");
const { UsrePackModel } = require("../../../models/userpack");
class UserPackageController extends Controller {
  async showAllPackage(req, res, next) {
    try {
      const userID = req.user._id;
      const result = await UsrePackModel.find({ userID ,isDeleted:false}).populate({
        path: "packageID",
        select: { fileAddress: 1 },
      });
      if (result.length == 0) throw createError.NotFound("You have not purchased any packages");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Package sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async showOnePackage(req, res, next) {
    try {
      const packageId = req.params.id;
      const result = await UsrePackModel.findOne({ _id: packageId }).populate({
        path: "packageID",
        select: { fileAddress: 1 },
      });
      if (!result) throw createError.NotFound("Can not found Package");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Package sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updatePackage(req, res, next) {
    try {
      const packageId = req.params.id;
      const pack = await UsrePackModel.findOne({ _id: packageId });
      if (!pack) throw createError.NotFound("Package Not Found!!!");
      let fields = [
        "name",
        "lotsize",
        "maxpos",
        "loginId",
        "botstatus",
        "title",
        "overallprofit",
        "trades",
      ];
      let badValues = ["", " ", null, NaN, undefined, -1];
      let data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const result = await UsrePackModel.updateOne(
        { _id: packageId },
        { $set: data }
      );
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "Update Package done",
          },
        });
      }
      throw createError.InternalServerError("Can not update Package");
    } catch (error) {
      next(error);
    }
  }
  async removePackage(req, res, next) {
    try {
      const packageId = req.params.id;
      const result = await UsrePackModel.findOne({ _id: packageId });
      if (!result) throw createError.NotFound("Can not found Package");
      const deletePackage = await UsrePackModel.updateOne(
        { _id: packageId },
        { $set: { isDeleted: true } }
      );
      if (deletePackage.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "delete Package done",
          },
        });
      }
      throw createError.InternalServerError("can not delete Package");
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
}
module.exports = {
  UserPackageController: new UserPackageController(),
};
