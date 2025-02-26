const Controller = require("../controller");
const { NewsModel } = require("../../../models/news");
const { PackageModel } = require("../../../models/products");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
class DeveloperController extends Controller {
  async showNews(req, res, next) {
    try {
      const result = await NewsModel.find().sort({ createdAt: -1 }).limit(3);
      if (!result) throw createError.NotFound("News Not Found");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "News sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async showPlan(req, res, next) {
    try {
      const result = await PackageModel.find().sort({ createdAt: -1 }).limit(3);
      if (!result) throw createError.NotFound("Plan Not Found");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Plan sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  DeveloperController: new DeveloperController(),
};
