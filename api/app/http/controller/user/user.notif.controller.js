const { NotifModel } = require("../../../models/notif");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
class UserNotifController {
    async showAllNotif(req, res, next) {
        try {
            const userID=req.user._id
            const result = await NotifModel.find({userID});
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
            const result = await NotifModel.findOne({ _id: notifId });
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
    async updateNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const notif = await NotifModel.findOne({ _id: notifId });
            if (!notif) throw createError.NotFound("Notif Not Found!!!");
            let fields = ["title"];
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
                      message: "Update Notif done",
                    },
                  });
            }
            throw createError.InternalServerError("Can not update Notif");
        } catch (error) {
            next(error);
        }
    }
    async removeNotif(req, res, next) {
        try {
            const notifId = req.params.id;
            const result = await NotifModel.findOne({ _id: notifId });
            if (!result)  throw createError.NotFound("Can not found Notif");
            const deleteNotif = await NotifModel.deleteOne({ _id: notifId });
            if (deleteNotif.deletedCount == 0)  throw createError.InternalServerError("can not delete Notif");
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
    UserNotifController: new UserNotifController(),
  };