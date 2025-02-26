const { NotifModel } = require("../../../models/notif");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const Controller = require("../controller");
class AdminNotifController extends Controller {
    async createNotif(req, res, next) {
        try {
            const { date, type, userID, title, descri } = req.body;
            const result = NotifModel.create({ date, type, userID, title, descri });
            if (!result)
            throw createError.InternalServerError("can not add notif");
            return res.status(HttpSatatus.CREATED).json({
                data: {
                  statusCode: HttpSatatus.CREATED,
                  success: true,
                  message: "Notif Add successfully",
                },
              });
        } catch (error) {
            next(error);
        }
    }
    async showAllNotif(req, res, next) {
        try {
            const result = await NotifModel.find();
            if (!result) throw createError.NotFound("Notif Not Found");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "Notif sent successfully",
                  result
                },
              });

        } catch (error) {
            next(error);
        }
    }
    async showOneNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const result = await NotifModel.find({ _id: notifId });
            if (!result) throw createError.NotFound("Can not found Notif");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "Notif sent successfully",
                  result
                },
              });

        } catch (error) {
            next(error);
        }
    }
    async showOneNotifOfUser(req, res, next) {
        try {
            const userID = req.user._id;
            const result = await NotifModel.find({ userID: userID });
            if (result.length === 0) throw createError.NotFound("Notif Not Found!!!");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "Code sent successfully",
                  result
                },
              });

        } catch (error) {
            next(error);
        }
    }
    async updateNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const notif = await NotifModel.findById({ _id: notifId });
            if (notif === 0) throw createError.NotFound("Notif Not Found!!!");
            let fields = ["date", "type", "userID", "title", "descri"];
            let badValues = ["", " ", null, NaN, undefined, -1];
            let data = { ...req.body };
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            const result = await NotifModel.updateOne({ _id: notifId }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(HttpSatatus.OK).json({
                    data: {
                      statusCode: HttpSatatus.OK,
                      success: true,
                      message: "update Notif done",
                      result
                    },
                  });
            }
            throw createError.InternalServerError("can not update Notif");
        } catch (error) {
            next(error);
        }
    }
    async removeNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const result = await NotifModel.findOne({ _id: notifId });
            if (!result) throw createError.NotFound("Can not found Notif");
            const deleteNotif = await NotifModel.deleteOne({ _id: notifId });
            if (deleteNotif.deletedCount == 0) throw createError.InternalServerError("can not delete Notif");
            return res.status(HttpSatatus.OK).json({
                data: {
                  statusCode: HttpSatatus.OK,
                  success: true,
                  message: "delete Notif done"
                },
              });

        } catch (error) {
            next(error);
        }
    }
  }
  module.exports = {
    AdminNotifController: new AdminNotifController(),
  };
  