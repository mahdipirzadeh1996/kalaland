const { PackageModel } = require("../../../models/products");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const path = require("path");
class PackageFileController {
  async createFile(req, res, next) {
    try {
      const { id } = req.params;
      const pack = await PackageModel.findById(id);
      if (!pack) throw createError.NotFound("Can not found Plan");
      console.log(req.body.fileUploadPath);
      console.log(req.body.filename);
      const fileAddress = path
        .join(req.body.fileUploadPath, req.body.filename)
        .replace(/[\\\\]/gm, "/");
      const result = await PackageModel.updateOne(
        { _id: id },
        { $set: {fileAddress} }
      );
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "Update Plan done",
          },
        });
      }
      throw createError.InternalServerError("Can not update Plan");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = {
  PackageFileController: new PackageFileController(),
};
