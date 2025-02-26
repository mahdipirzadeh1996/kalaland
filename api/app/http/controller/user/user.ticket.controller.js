const { TicketModel } = require("../../../models/ticket");
const Controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const path = require("path");
const { default: mongoose, trusted } = require("mongoose");
const { deleteFileInPublic } = require("../../../utils/function");
const {
  addToTicketSchema,
  addAnswerToTicketSchema,
} = require("../../validations/users/ticket.validator");
class UserTicketController extends Controller {
  async createTicket(req, res, next) {
    try {
      const userID = req.user._id;
      const { email, topic, department, releventRobot, importTick, text } =
        req.body;
      await addToTicketSchema.validateAsync(req.body);
      // if (parentID) {
      //   const parent = await TicketModel.findOneAndUpdate(
      //     { _id: parentID },
      //     { $set: { statustick: "Answered" } }
      //   );
      //   if (!parent) throw createError.NotFound("Can not found Ticket");
      //   result = await TicketModel.create({
      //     userID,
      //     email,
      //     parentID,
      //     topic: parent.topic,
      //     department: parent.department,
      //     releventRobot: parent.releventRobot,
      //     statustick: "Open",
      //     importTick: parent.importTick,
      //     text,
      //     ticketNumber: parent.ticketNumber,
      //     isFirst: false,
      //   });
      //   if (!parent.isFirst) {
      //     const ticketUpdate = await TicketModel.findOneAndUpdate(
      //       { ticketNumber: parent.ticketNumber, isFirst: true },
      //       { $set: { statustick: "Open" } }
      //     );
      //     console.log(ticketUpdate);
      //   }
      // } else
      const ticketNumber = new Date().getTime();
      const result = await TicketModel.create({
        userID,
        email,
        topic,
        department,
        releventRobot,
        statustick: "Open",
        importTick,
        text,
        ticketNumber,
        isFirst: true,
        isUser: true,
      });
      if (!result) throw createError.Unauthorized("Can not add Ticket");
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: "Ticket Add successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createTicketAnswer(req, res, next) {
    try {
      await addAnswerToTicketSchema.validateAsync(req.body);
      const userID = req.user._id;
      const { text, name, email, parentID } = req.body;
      const parent = await TicketModel.findOneAndUpdate(
        { _id: parentID, statustick: "Open", adminID: { $ne: userID } },
        { $set: { statustick: "Answered" } }
      );
      console.log(userID);
      if (!parent) throw createError.NotFound("Can not found Ticket");
      const result = await TicketModel.create({
        userID,
        adminID: parent.adminID,
        email,
        parentID,
        topic: parent.topic,
        department: parent.department,
        releventRobot: parent.releventRobot,
        statustick: "Open",
        importTick: parent.importTick,
        text,
        ticketNumber: parent.ticketNumber,
        isFirst: false,
        isUser: true,
      });
      if (!parent.isFirst) {
        await TicketModel.findOneAndUpdate(
          { ticketNumber: parent.ticketNumber, isFirst: true },
          { $set: { statustick: "Open" } }
        );
      }
      if (!result) throw createError.Unauthorized("Can not add Ticket");
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: "Ticket Add successfully",
          result,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async showAllTicket(req, res, next) {
    try {
      const userID = req.user._id;
      const result = await TicketModel.find({
        userID,
        parentID: undefined,
      });
      if (result.length == 0) throw createError.NotFound("Ticket Not Found");
      for (const resa of result) {
        if (resa?.image)
          resa.image =
            req.protocol +
            "://" +
            req.get("host") +
            "/" +
            resa.image.replace(/[\\\\]/gm, "/");
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Ticket sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async showOneTicket(req, res, next) {
    try {
      const userID = req.user._id;
      const ticketId = req.params.id;
      const result = await TicketModel.findOne({ _id: ticketId, userID });
      if (!result) throw createError.NotFound("Can not found Ticket");
      if (result?.image)
        result["image"] =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          result["image"].replace(/[\\\\]/gm, "/");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Ticket sent successfully",
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async showOneTicketOfUser(req, res, next) {
    try {
      const userID = JSON.stringify(req.user.userID);

      const result = await TicketModel.find({ userID });
      if (result.length === 0)
        throw { status: 404, message: "can not found ticket" };
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
  async updateTicket(req, res, next) {
    try {
      const userID = req.user._id;
      const ticketId = req.params.id;
      const ticke = await TicketModel.findOne({ _id: ticketId, userID });
      if (!ticke) throw createError.NotFound("Ticket Not Found!!!");
      let fields = [
        "email",
        "topic",
        "department",
        "releventRobot",
        "importTick",
        "statustick",
        "text",
      ];
      let badValues = ["", " ", null, NaN, undefined, -1];
      let data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const result = await TicketModel.updateOne(
        { _id: ticketId, userID },
        { $set: data }
      );
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "Update Ticket done",
          },
        });
      }
      throw createError.InternalServerError("Can not update Ticket");
    } catch (error) {
      next(error);
    }
  }
  async removeTicket(req, res, next) {
    try {
      const userID = req.user._id;
      const ticketId = req.params.id;
      const result = await TicketModel.findOne({ _id: ticketId, userID });
      if (!result) throw createError.NotFound("Can not found Ticket");
      const deleteNotif = await TicketModel.deleteOne({
        _id: ticketId,
        userID,
      });
      if (deleteNotif.deletedCount == 0)
        throw createError.InternalServerError("can not delete Ticket");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "delete Ticket done",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async uploadTicketImage(req, res, next) {
    try {
      const image = path
        .join(req?.body?.fileUploadPath, req?.body?.filename)
        .replace(/[\\\\]/gm, "/");
      req.body.image = image;
      const userID = req.user._id;
      const ticketId = req.params.id;
      const ticket = await TicketModel.findOne({
        _id: ticketId,
        userID,
        isUser: true,
      });
      if (!ticket) throw createError.NotFound("Can not found Ticket");
      const result = await TicketModel.updateOne(
        { _id: ticketId, userID, isUser: true },
        { $set: { image } }
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
      if (req.body.image) deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async showAllTickGraphLookUp(req, res, next) {
    try {
      const result = await TicketModel.aggregate([
        {
          $graphLookup: {
            from: "tickets",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentID",
            maxDepth: 5,
            depthField: "depth",
            as: "answers",
          },
        },

        {
          $project: {
            __v: 0,
            "answers.__v": 0,
            "answers.parentID": 0,
          },
        },
        {
          $match: {
            parentID: undefined,
          },
        },
        { $sort: { "answers.depth": 1 } },
      ]);
      for (const resa of result) {
        resa.answers.sort((a, b) => a.depth - b.depth);
        if (resa.image)
          resa.image =
            req.protocol +
            "://" +
            req.get("host") +
            "/" +
            resa.image.replace(/[\\\\]/gm, "/");
        for (const chile of resa.answers) {
          if (chile.image)
            chile.image =
              req.protocol +
              "://" +
              req.get("host") +
              "/" +
              chile.image.replace(/[\\\\]/gm, "/");
        }
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Ticket sent successfully",
          result: result[0],
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async showOneTickGraphLookUp(req, res, next) {
    try {
      const { id: _id } = req.params;
      const userID = req.user._id;
      const result = await TicketModel.aggregate([
        {
          $match: {
            userID: mongoose.Types.ObjectId(userID),
            _id: mongoose.Types.ObjectId(_id),
          },
        },
        {
          $graphLookup: {
            from: "tickets",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentID",
            maxDepth: 5,
            depthField: "depth",
            as: "answers",
          },
        },
        { $sort: { "answers.createdAt": 1 } },
        {
          $project: {
            __v: 0,
            "answers.__v": 0,
            "answers.parentID": 0,
          },
        },
      ]);
      if (!result[0]) throw createError.NotFound("Can not found Ticket");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Ticket sent successfully",
          result: result[0],
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async closeOneTicket(req, res, next) {
    try {
      const userID = req.user._id;
      const ticketId = req.params.id;
      const result = await TicketModel.findOne({ _id: ticketId, userID });
      if (!result) throw createError.NotFound("Can not found Ticket");
      const updateTicket= await TicketModel.updateMany({ticketNumber:result.ticketNumber},{$set:{statustick:'Closed'}})
      if(updateTicket.modifiedCount==0)throw createError.InternalServerError("Can not Close Ticket");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Ticket Closed successfully",
          result
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  UserTicketController: new UserTicketController(),
};
