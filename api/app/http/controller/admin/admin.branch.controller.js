const createError = require('http-errors')
const { StatusCodes: HttpSatatus } = require('http-status-codes')

const { BranchesModel } = require('../../../models/branches')
const { SubBranchesModel } = require('../../../models/subBranches')
const Controller = require('../controller')

class AdminBranchController extends Controller {
  async createBranch(req, res, next) {
    try {
      const { name } = req.body
      const branch = BranchesModel.find({ name: name })
      if (branch) throw createError.Unauthorized('دسته بندی تکراری')
      const result = await BranchesModel.create({ name })
      if (!result)
        throw createError.Unauthorized(
          'متاسفانه دسته بندی ایجاد نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'دسته بندی با موفقیت ایجاد شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showAllBranches(req, res, next) {
    try {
      const result = await BranchesModel.find()
      if (!result) throw createError.NotFound('دسته بندی یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'دسته بندی ها با موفقیت یافت شدند',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateBranch(req, res, next) {
    try {
      const branchId = req.params.id

      const branch = await BranchesModel.findOne({ _id: branchId })
      if (!branch) throw createError.NotFound('دسته بندی با این id یافت نشد!')

      let fields = ['name']
      const nullisData = process.env.NULLisData
      let data = { ...req.body }
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        if (nullisData.includes(value)) delete data[key]
      })
      const result = await BranchesModel.updateOne(
        { _id: branchId },
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

  async removeBranch(req, res, next) {
    try {
      const branchId = req.params.id

      const result = await BranchesModel.findOne({ _id: branchId })
      if (!result) throw createError.NotFound('دسته بندی با این id یافت نشد!')

      const subResult = await SubBranchesModel.find({
        parentBranch: branchId,
      })
      if (!subResult)
        throw createError.NotFound(' زیر شاخه ای با این id یافت نشد!')

      const deleteSubBranch = await SubBranchesModel.delete({
        parentBranch: branchId,
      })
      if (deleteSubBranch.deletedCount == 0)
        throw createError.InternalServerError(
          'متاسفانه زیر شاخه ها حذف نشدند، لطفا مجددا تلاش کنید!',
        )

      const deleteBranch = await BranchesModel.deleteOne({
        _id: branchId,
      })
      if (deleteBranch.deletedCount == 0)
        throw createError.InternalServerError(
          'متاسفانه دسته بندی حذف نشد، لطفا مجددا تلاش کنید!',
        )

      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'دسته بندی با زیر شاخه هایش با موفقیت حذف شدند',
        },
      })
    } catch (error) {
      next(error)
    }
  }
}

class AdminSubBranchController extends Controller {
  async createSubBranch(req, res, next) {
    try {
      const { name, parentBranch } = req.body
      const subBranch = SubBranchesModel.find({ name: name })
      if (subBranch) throw createError.Unauthorized('زیر شاخه تگراری')
      const result = await SubBranchesModel.create({ name, parentBranch })
      if (!result)
        throw createError.Unauthorized(
          'متاسفانه زیر شاخه ایجاد نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'زیر شاخه با موفقیت ایجاد شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showAllSubBranches(req, res, next) {
    try {
      const result = await SubBranchesModel.find()
      if (!result) throw createError.NotFound('زیر شاخه ای بندی یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'زیر شاخه ها با موفقیت یافت شدند',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateSubBranch(req, res, next) {
    try {
      const subBranchId = req.params.id

      const subBranch = await SubBranchesModel.findOne({ _id: subBranchId })
      if (!subBranch) throw createError.NotFound('دسته بندی با این id یافت نشد!')

      let fields = ['name']
      const nullisData = process.env.NULLisData
      let data = { ...req.body }
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        if (nullisData.includes(value)) delete data[key]
      })
      const result = await SubBranchesModel.updateOne(
        { _id: subBranchId },
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

  async removeSubBranch(req, res, next) {
    try {
      const subBranchId = req.params.id

      const result = await SubBranchesModel.findOne({ _id: subBranchId })
      if (!result) throw createError.NotFound('زیر شاخه ای با این id یافت نشد!')

      const deleteSubBranch = await SubBranchesModel.deleteOne({
        parentBranch: branchId,
      })
      if (deleteSubBranch.deletedCount == 0)
        throw createError.InternalServerError(
          'متاسفانه زیر شاخه حذف نشد، لطفا مجددا تلاش کنید!',
        )

      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'زیر شاخه با موفقیت حذف شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  AdminBranchController: new AdminBranchController(),
  AdminSubBranchController: new AdminSubBranchController(),
}
