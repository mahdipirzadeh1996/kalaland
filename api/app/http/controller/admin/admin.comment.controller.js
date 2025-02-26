const createError = require('http-errors')
const { StatusCodes: HttpSatatus } = require('http-status-codes')

const { CommentsModel } = require('../../../models/comments')
const Controller = require('../controller')
const { addTicketSchema } = require('../../validations/admin/ticket.validator')
const { deleteFileInPublic } = require('../../../utils/function')
const { RandomNumberGenerator } = require('../../../utils/function')

class AdminCommentController extends Controller {
  async createComment(req, res, next) {
    try {
      const userId = req.user.id
      const { productId, text } = req.body
      const result = await CommentsModel.create({ userId, productId, text })
      if (!result)
        throw createError.Unauthorized(
          'متاسفانه نظر ایجاد نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'نظر با موفقیت ایجاد شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showAllProductComment(req, res, next) {
    try {
      const { productId } = req.body
      const result = await CommentsModel.find({ productId })
      if (!result) throw createError.NotFound('نظری یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'نظرات با موفقیت یافت شدند',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.id

      const comment = await CommentsModel.findOne({ _id: commentId })
      if (!comment) throw createError.NotFound('نظری با این id یافت نشد!')

      let fields = ['text']
      const nullisData = process.env.NULLisData
      let data = { ...req.body }
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        if (nullisData.includes(value)) delete data[key]
      })
      const result = await CommentsModel.updateOne(
        { _id: commentId },
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

  async removeComment(req, res, next) {
    try {
      const commentId = req.params.id

      const result = await CommentsModel.findOne({ _id: commentId })
      if (!result) throw createError.NotFound('نظری با این id یافت نشد!')

      const deleteComment = await CommentsModel.deleteOne({
        _id: commentId,
      })
      if (deleteComment.deletedCount == 0)
        throw createError.InternalServerError(
          'متاسفانه نظر حذف نشد، لطفا مجددا تلاش کنید!',
        )

      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'نظر با موفقیت حذف شدند',
        },
      })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = {
  AdminCommentController: new AdminCommentController(),
}
