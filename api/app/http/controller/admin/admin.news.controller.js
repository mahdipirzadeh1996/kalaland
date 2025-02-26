const { NewsModel } = require("../../../models/news");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const user = require("../../../models/users");
const { creatNewsSchema } = require("../../validations/news.validator");
const path = require("path");
const { deleteFileInPublic } = require("../../../utils/function");
module.exports = new (class NewsController {
  async createNews(req, res, next) {
    try {
      console.log(req.file);
      await creatNewsSchema.validateAsync(req.file.data);
      req.body.image = req.file?.path.replace(/[\\\\]/gm, "/").substring(20);
        // .join(req.file.destination, req.file.filename)
        // .replace(/[\\\\]/gm, "/");
      const image = req.body.image;
      const { title, description } = JSON.parse(req.body.data);
      let timestamp = new Date().getTime();
      const userId = req.user._id;
      const result = await NewsModel.create({
        userId,
        title,
        description,
        timestamp,
        image,
        author: req.user._id,
      });
      if (!result) throw createError.Unauthorized("Can not add News");
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: "News Add successfully",
          result,
        },
      });
    } catch (error) {
      if (req.body.image) deleteFileInPublic(req.body.image);
      console.log(error);
      next(error);
    }
  }
  async showAllNews(req, res, next) {
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
  async showOneNews(req, res, next) {
    try {
      const newsID = req.params.id;
      const result = await NewsModel.findById({ _id: newsID });
      if (!result) throw createError.NotFound("Can not found News");
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
  async showOneNewsOfUser(req, res, next) {
    try {
      const userID = req.user._id;
      const result = await NewsModel.find({ userID: userID });
      if (result.length == 0) throw createError.NotFound("News Not Found!!!");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Code sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateNews(req, res, next) {
    try {
      const newsID = req.params.id;
      const news = await NewsModel.findById({ _id: newsID });
      if (!news) throw createError.NotFound("News Not Found!!!");
      let fields = ["title", "description"];
      let badValues = ["", " ", null, NaN, undefined, -1];
      let data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const result = await NewsModel.updateOne({ _id: newsID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "Update News done",
          },
        });
      }
      throw createError.InternalServerError("Can not update News");
    } catch (error) {
      next(error);
    }
  }
  async removeNews(req, res, next) {
    try {
      const newsID = req.params.id;
      const result = await NewsModel.findOne({ _id: newsID });
      if (!result) throw createError.NotFound("Can not found News");
      const deleteNotif = await NewsModel.deleteOne({ _id: newsID });
      if (deleteNotif.deletedCount == 0)
        throw createError.InternalServerError("can not delete News");
        deleteFileInPublic(result.image);
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "delete News done",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async uploadNewsImage(req, res, next) {
    try {
      if (Object.keys(req.file).length == 0)
        throw createError.BadRequest("Can not upload image");
      const newsId = JSON.parse(req.body.data)._id;
      const filePath = req.file?.path.replace(/[\\\\]/gm, "/").substring(7);
      const result = await NewsModel.updateOne(
        { _id: newsId },
        { $set: { image: filePath } }
      );
      if (result.modifiedCount == 0)
        throw createError.InternalServerError("Can not upload image");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Upload image done",
        },
      });
    } catch (error) {
      next(error);
    }
  }
})();
