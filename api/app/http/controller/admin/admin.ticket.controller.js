const createError = require('http-errors')
const { StatusCodes: HttpSatatus } = require('http-status-codes')
const path = require('path')
const { default: mongoose } = require('mongoose')

const { TicketModel } = require('../../../models/ticket')
const Controller = require('../controller')
const { deleteFileInPublic } = require('../../../utils/function')

class AdminTicketController extends Controller {
  async createTicket(req, res, next) {
    try {
      const adminId = req.user._id
      // const parentId = RandomNumberGenerator()

      const { userId, email, topic, text } = req.body
      const result = await TicketModel.create({
        userId,
        adminId,
        email,
        ticketNumber: 1,
        statusTick: 'Answered',
        topic,
        text,
        isFirst: true,
        isUser: false,
        isChecked: true,
      })
      if (!result)
        throw createError.Unauthorized(
          'متاسفانه تیکت ایجاد نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'تیکت با موفقیت ایجاد شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async answerTicket(req, res, next) {
    try {
      const adminId = req.user._id
      // const parentId = RandomNumberGenerator()

      const { userId, email, ticketNumber, text, parentId } = req.body

      const converstion = await TicketModel.find({ parentId, adminId })
      if (!converstion) throw createError.NotFound('تیکتی یافت نشد!')

      for (let i = 0; i < converstion.length; i++) {
        const result = await TicketModel.updateMany(
          {
            _id: result[i]._id,
            adminId: result[i].adminId,
            parentId: result[i].parentId,
          },
          { $set: { statusTick: 'Answered', isChecked: true } },
        )
        if (result.modifiedCount <= 0) {
          throw createError.InternalServerError('لطفا مجددا تلاش کنید!')
        }
      }

      const result = await TicketModel.create({
        userId,
        adminId,
        email,
        ticketNumber: ticketNumber + 1,
        statusTick: 'Answered',
        text,
        parentId,
        isFirst: false,
        isUser: false,
        isChecked: true,
      })
      if (!result)
        throw createError.Unauthorized(
          'متاسفانه تیکت پاسخ ایجاد نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'تیکت پاسخ با موفقیت ایجاد شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }

    // try {
    //   const admin = req.user
    //   const { userId, ticketNumber, image, text, parentId } = req.body
    //   const parent = await TicketModel.findOneAndUpdate(
    //     {
    //       userId: userId,
    //       adminId: { $ne: admin._id },
    //       parentId: parentId,
    //       statustick: 'Open',
    //       isChecked: false,
    //     },
    //     {
    //       $set: { statustick: 'Answered', adminID: user._id, isChecked: true },
    //     },
    //   )
    //   if (!parent) throw createError.NotFound('Can not found Ticket')
    //   let result = await TicketModel.create({
    //     userID: parent.userID,
    //     email: user.email,
    //     parentID,
    //     adminID: user._id,
    //     topic: parent.topic,
    //     department: parent.department,
    //     releventRobot: parent.releventRobot,
    //     statustick: 'Open',
    //     importTick: parent.importTick,
    //     text,
    //     ticketNumber: parent.ticketNumber,
    //     isFirst: false,
    //     isUser: false,
    //   })
    //   if (!parent.isFirst) {
    //     const ticketUpdate = await TicketModel.findOneAndUpdate(
    //       { ticketNumber: parent.ticketNumber, isFirst: true },
    //       { $set: { statustick: 'Answered' } },
    //     )
    //   }
    //   if (!result) throw createError.Unauthorized('Can not add Ticket')
    //   return res.status(HttpSatatus.CREATED).json({
    //     data: {
    //       statusCode: HttpSatatus.CREATED,
    //       success: true,
    //       message: 'Ticket Add successfully',
    //       result,
    //     },
    //   })
    // } catch (error) {
    //   next(error)
    // }
  }

  async showOneTicketById(req, res, next) {
    try {
      const ticketId = req.params.id
      const result = await TicketModel.findOne({ _id: ticketId })
      if (!result) throw createError.NotFound('تیکتی با این id یافت نشد!')
      if (result['image'])
        result['image'] =
          req.protocol +
          '://' +
          req.get('host') +
          '/' +
          result['image'].replace(/[\\\\]/gm, '/')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'تیکت با موفقیت یافت شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showFirstAdminTicket(req, res, next) {
    try {
      const adminId = req.user._id
      
      console.log(adminId)
      const result = await TicketModel.aggregate([
        {
          $match: {
            adminId: mongoose.Types.ObjectId(adminId),
            isFirst: true,
          },
        },
        {
          $graphLookup: {
            from: 'tickets',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parentId',
            maxDepth: 5,
            depthField: 'depth',
            as: 'childeren',
          },
        },
        {
          $project: {
            __v: 0,
            'childeren.__v': 0,
          },
        },
        { $sort: { 'childeren.depth': 1 } },
      ])

      //const result = await TicketModel.find({ userID });
      if (result.length == 0) throw createError.NotFound('Ticket Not Found!!!')
      for (const resa of result) {
        resa.childeren.sort((a, b) => a.depth - b.depth)
        if (resa.image)
          resa.image =
            req.protocol +
            '://' +
            req.get('host') +
            '/' +
            resa.image.replace(/[\\\\]/gm, '/')
        for (const chile of resa.childeren) {
          if (chile.image)
            chile.image =
              req.protocol +
              '://' +
              req.get('host') +
              '/' +
              chile.image.replace(/[\\\\]/gm, '/')
        }
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'Code sent successfully',
          result,
        },
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async updateTicket(req, res, next) {
    try {
      const adminId = req.user._id
      const ticketId = req.params.id

      const ticket = await TicketModel.findOne({ _id: ticketId, adminId })
      if (!ticket) throw createError.NotFound('تیکتی با این id یافت نشد!')

      let fields = ['email', 'topic', 'statusTick', 'text']
      const nullisData = process.env.NULLisData
      let data = { ...req.body }
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        if (nullisData.includes(value)) delete data[key]
      })
      const result = await TicketModel.updateOne(
        { _id: ticketId, adminId },
        { $set: data },
      )
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: 'ویرایش با موفقیت انجام شد!',
          },
        })
      }
      throw createError.InternalServerError(
        'متاسفانه ویرایش انجام نشد، لطفا مجددا تلاش کنید!',
      )
    } catch (error) {
      next(error)
    }
  }

  async removeTicket(req, res, next) {
    try {
      const adminId = req.user._id
      const ticketId = req.params.id

      const result = await TicketModel.findOne({ _id: ticketId, userID })
      if (!result) throw createError.NotFound('تیکتی با این id یافت نشد!')
      const deleteTicket = await TicketModel.deleteOne({
        _id: ticketId,
        adminId,
      })
      if (deleteTicket.deletedCount == 0)
        throw createError.InternalServerError(
          'متاسفانه تیکت حذف نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'تیکت با موفقیت حذف شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //close-ticket
  async closeTicket(req, res, next) {
    try {
      const adminId = req.user._id
      const ticketId = req.params.id
      const { userId, email, ticketNumber, image, text, parentId } = req.body

      const ticket = await TicketModel.findOne({ ticketId, parentId, adminId })
      if (!ticket)
        throw createError.NotFound(
          'متاسفانه تیکت یافت نشد، لطفا مجددا تلاش کنید!',
        )

      for (let i = 0; i < ticket.length; i++) {
        const result = await TicketModel.updateMany(
          {
            _id: result[i]._id,
            adminId: result[i].adminId,
            parentId: result[i].parentId,
          },
          { $set: { statusTick: 'Closed', isChecked: true } },
        )
        if (result.modifiedCount <= 0) {
          throw createError.InternalServerError('لطفا مجددا تلاش کنید!')
        }
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'تیکت با موفقیت بسته شد',
        },
      })

      // const result = await TicketModel.updateMany(
      //   { _id: ticketId, adminId },
      //   { $set: { statustick: 'Closed' } },
      // )
      // if (result.modifiedCount > 0) {
      //   return res.status(HttpSatatus.OK).json({
      //     data: {
      //       statusCode: HttpSatatus.OK,
      //       success: true,
      //       message: 'تیکت با موفقیت بسته شد',
      //     },
      //   })
      // }
      // throw createError.InternalServerError(
      //   'متاسفانه تیکت بسته نشد، لطفا مجددا تلاش کنید!',
      // )
    } catch (error) {
      next(error)
    }
  }

  //all-conversation
  async showAllTicketConversation(req, res, next) {
    try {
      const adminId = req.user._id
      const result = await TicketModel.aggregate([
        {
          $match: {
            adminId: mongoose.Types.ObjectId(adminId),
          },
        },
        {
          $graphLookup: {
            from: 'ticket',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parentId',
            maxDepth: 10,
            depthField: 'depth',
            as: 'childeren',
          },
        },
        {
          $project: {
            __v: 0,
            'childeren.__v': 0,
          },
        },
        { $sort: { 'childeren.depth': 1 } },
      ])
      if (result.length == 0) throw createError.NotFound('تیکتی یافت نشد!')
      for (const resa of result) {
        resa.childeren.sort((a, b) => a.depth - b.depth)
        if (resa.image)
          resa.image =
            req.protocol +
            '://' +
            req.get('host') +
            '/' +
            resa.image.replace(/[\\\\]/gm, '/')
        for (const chile of resa.childeren) {
          if (chile.image)
            chile.image =
              req.protocol +
              '://' +
              req.get('host') +
              '/' +
              chile.image.replace(/[\\\\]/gm, '/')
        }
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'تیکت ها با موفقیت یافت شدند',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //one-conversation
  async showOneTicketConversation(req, res, next) {
    try {
      const adminId = req.user._id
      const ticketId = req.params.id

      const result = await TicketModel.aggregate([
        {
          $match: {
            adminId: mongoose.Types.ObjectId(adminId),
            _id: mongoose.Types.ObjectId(ticketId),
          },
        },
        {
          $graphLookup: {
            from: 'tickets',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parentID',
            maxDepth: 5,
            depthField: 'depth',
            as: 'childeren',
          },
        },
        {
          $project: {
            __v: 0,
            'childeren.__v': 0,
          },
        },
        { $sort: { 'childeren.depth': 1 } },
      ])
      if (result.length == 0) throw createError.NotFound('Ticket Not Found!!!')
      for (const resa of result) {
        resa.childeren.sort((a, b) => a.depth - b.depth)
        if (resa.image)
          resa.image =
            req.protocol +
            '://' +
            req.get('host') +
            '/' +
            resa.image.replace(/[\\\\]/gm, '/')
        for (const chile of resa.childeren) {
          if (chile.image)
            chile.image =
              req.protocol +
              '://' +
              req.get('host') +
              '/' +
              chile.image.replace(/[\\\\]/gm, '/')
        }
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'Code sent successfully',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //image
  async uploadTicketImage(req, res, next) {
    try {
      const image = path
        .join(req?.body?.fileUploadPath, req?.body?.filename)
        .replace(/[\\\\]/gm, '/')
      req.body.image = image
      const adminId = req.user._id
      const ticketId = req.params.id

      console.log(image)

      const ticket = await TicketModel.findOne({
        _id: ticketId,
        isUser: false,
        adminId,
      })
      if (!ticket)
        throw createError.NotFound(
          'متاسفانه تیکت یافت نشد، لطفا مجددا تلاش کنید!',
        )

      const result = await TicketModel.updateOne(
        { _id: ticketId, adminId, isUser: false },
        { $set: { image } },
      )
      if (result.modifiedCount == 0)
        throw createError.InternalServerError(
          'نتاسفانه تصویر آپلود نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'تصویر با موفقیت آپلود شد',
        },
      })
    } catch (error) {
      if (req.body.image) deleteFileInPublic(req.body.image)
      next(error)
    }
  }

  //all-parent
  async showAllParentTicket(req, res, next) {
    try {
      const result = await TicketModel.find({ parentID: undefined })
      if (result.length === 0) throw createError.NotFound('Ticket Not Found')
      for (const resa of result) {
        if (resa?.image)
          resa.image =
            req.protocol +
            '://' +
            req.get('host') +
            '/' +
            resa.image.replace(/[\\\\]/gm, '/')
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'Ticket sent successfully',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //all-openparent
  async showAllOpenParentTicket(req, res, next) {
    try {
      const result = await TicketModel.find({
        parentID: undefined,
        isFirst: true,
        statustick: 'Open',
        isChecked: false,
      })
      if (result.length == 0) throw createError.NotFound('Ticket Not Found')
      for (const resa of result) {
        if (resa?.image)
          resa.image =
            req.protocol +
            '://' +
            req.get('host') +
            '/' +
            resa.image.replace(/[\\\\]/gm, '/')
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'Ticket sent successfully',
          result,
        },
      })
      // const result = await TicketModel.aggregate([
      //     {
      //         $lookup: {
      //             from: "tickets",
      //             localField: "_id",
      //             foreignField: "parentID",
      //             as: "childeren"
      //         }
      //     }, {
      //         $project: {
      //             __v: 0,
      //             "childeren.__v": 0
      //         }
      //     },
      //     {
      //         $match: {
      //             parentID: undefined
      //         }
      //     }
      // ])

      // const result = await TicketModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "tickets",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parentID",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "childeren",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "childeren.__v": 0,
      //       "childeren.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parentID: undefined,
      //     },
      //   },
      // ]);
    } catch (error) {
      next(error)
    }
  }

  //all-open
  async showAllOpenTicket(req, res, next) {
    try {
      const adminId = req.user._id
      const result = await TicketModel.find({ adminId, statusTick: 'Open' })
      if (result.length == 0) throw createError.NotFound('تیکت بازی یافت نشد!')
      for (const resa of result) {
        if (resa?.image)
          resa.image =
            req.protocol +
            '://' +
            req.get('host') +
            '/' +
            resa.image.replace(/[\\\\]/gm, '/')
      }
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'تیکت های باز با موفقیت یافت شدند!',
          result,
        },
      })
      // const result = await TicketModel.aggregate([
      //     {
      //         $lookup: {
      //             from: "tickets",
      //             localField: "_id",
      //             foreignField: "parentID",
      //             as: "childeren"
      //         }
      //     }, {
      //         $project: {
      //             __v: 0,
      //             "childeren.__v": 0
      //         }
      //     },
      //     {
      //         $match: {
      //             parentID: undefined
      //         }
      //     }
      // ])

      // const result = await TicketModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "tickets",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parentID",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "childeren",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "childeren.__v": 0,
      //       "childeren.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parentID: undefined,
      //     },
      //   },
      // ]);
    } catch (error) {
      next(error)
    }
  }
}
module.exports = {
  AdminTicketController: new AdminTicketController(),
}
