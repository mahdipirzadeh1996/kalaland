const { RolesModel } = require('../../../../models/roles')
const Controller = require('../../controller')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const createHttpError = require('http-errors')
const { addRoleSchema } = require('../../../validations/admin/RBAC.schema')
const { default: mongoose } = require('mongoose')
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require('../../../../utils/function')

class RoleControlller extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RolesModel.find()

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          roles,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async createNewRole(req, res, next) {
    try {
      const { title } = await addRoleSchema.validateAsync(req.body)
      await this.findRoleWithTitle(title)
      const role = await RolesModel.create({ title, permissions })
      if (!role) throw createHttpError.InternalServerError('نقش ایجاد نشد')
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'نقش باموفقیت ایجاد شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async removeRole(req, res, next) {
    try {
      const id = req.params.id
      const role = await RolesModel.findOne({ _id: id })
      if (!role) throw createError.NotFound('نقشی یافت نشد!')

      const removeRoleResult = await RolesModel.deleteOne({ _id: id })
      if (!removeRoleResult.deletedCount)
        throw createHttpError.InternalServerError('حذف نقش انجام نشد')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'حذف نقش با موفقیت انجام شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateRoleByID(req, res, next) {
    try {
      const { id } = req.params
      const role = await this.findRoleWithIdOrTitle(id)
      const data = copyObject(req.body)
      deleteInvalidPropertyInObject(data, [])
      const updateRoleResult = await RolesModel.updateOne(
        { _id: role._id },
        {
          $set: data,
        },
      )
      if (!updateRoleResult.modifiedCount)
        throw createHttpError.InternalServerError('ویرایش نقش انجام نشد')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'ویرایش نقش با موفقیت انجام شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async findRoleWithIdOrTitle(field) {
    let findQuery = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field }
    const role = await RolesModel.findOne(findQuery)
    if (!role) throw createHttpError.NotFound('نقش مورد نظر یافت نشد')
    return role
  }
}
module.exports = {
  RoleController: new RoleControlller(),
}
