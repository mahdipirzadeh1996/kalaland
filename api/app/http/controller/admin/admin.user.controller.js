const createError = require('http-errors')
const { StatusCodes: HttpSatatus } = require('http-status-codes')
const { UserModel } = require('../../../models/users')
const { RolesModel } = require('../../../models/roles')
const Controller = require('../controller')
const { hashString } = require('../../../modules/function')
const { copyObject } = require('../../../utils/function')

class AdminUserController extends Controller {
  async createUser(req, res, next) {
    try {
      const {
        name,
        family,
        password,
        confirm_password,
        email,
        mobile,
        roles,
      } = req.body

      for (let i = 0; i < roles.length; i++) {
        await this.checkExistRole(roles[i])
      }

      if (password != confirm_password)
        throw createError.Conflict('گذرواژه ها با هم مطابقت ندارند!')

      const hash_password = hashString(password)
      const result = await UserModel.create({
        name,
        family,
        password: hash_password,
        email,
        mobile,
        roles,
      })

      if (!result)
        throw createError.Unauthorized(
          'متاسفان کاربر اضافه نشد مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'کاربر با موفقیت اضافه شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showAllUser(req, res, next) {
    try {
      const result = await UserModel.find()
      if (!result) throw createError.NotFound('کاربری یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'کاربران با موفقیت یافت شدند',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showOneUserById(req, res, next) {
    try {
      const id = req.params.id
      const result = await UserModel.find({ _id: id })
      if (!result) throw createError.NotFound('کاربر یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'کاربر با موفقیت ارسال شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showOneUserByEmail(req, res, next) {
    try {
      const email = req.params.email
      const result = await UserModel.find({ email: email })
      if (!result) throw createError.NotFound('کاربر یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'کاربر با موفقیت ارسال شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showOneUserByMobile(req, res, next) {
    try {
      const mobile = req.params.mobile
      const result = await UserModel.find({ mobile: mobile })
      if (!result) throw createError.NotFound('کاربر یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'کاربر با موفقیت ارسال شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.id
      const user = await UserModel.findById(id)
      if (!user) throw createError.NotFound('کاربر یافت نشد!')
      const fields = [
        'name',
        'family',
        'statusActive',
        'password',
        'roles',
        'token',
      ]

      const nullisData = process.env.NULLisData
      let data = { ...req.body }

      if (data.password != data.confirm_password)
        throw createError.Conflict('گذرواژه ها با هم مطابقت ندارند!')

      Object.entries(data).forEach((key) => {
        if (fields.includes(key)) delete data[key]
        if (nullisData.includes(data[key])) delete data[key]
      })
      const result = await UserModel.updateOne({ _id: id }, { $set: data })
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: 'ویرایش با موفقیت انجام شد',
          },
        })
      }
      throw createError.InternalServerError(
        'متاسفانه ویرایش انجام نشد، مجددا تلاش کنید!',
      )
    } catch (error) {
      next(error)
    }
  }

  async updateStatusActive(req, res, next) {
    try {
      const id = req.params.id
      const user = await UserModel.findById(id)
      if (!user) throw createError.NotFound('کاربر یافت نشد!')
      const fields = [
        'name',
        'family',
        'password',
        'email',
        'roles',
        'token',
        'mobile',
      ]
      const data = copyObject(req.body)
      const nullisData = process.env.NULLisData
      Object.keys(data).forEach((key) => {
        if (fields.includes(key)) {
          delete data[key]
        }
        if (nullisData.includes(data[key])) delete data[key]
      })
      const result = await UserModel.updateOne({ _id: id }, { $set: data })
      if (result.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: 'وضعیت کاربر با موفقیت تغییر کرد',
          },
        })
      }
      throw createError.InternalServerError('متاسفانه وضعیت کاربر تغییر نکرد، لطفا مجددا تلاش کنید!')
    } catch (error) {
      next(error)
    }
  }

  async removeUser(req, res, next) {
    try {
      const id = req.params.id
      const result = await UserModel.findOne({ _id: id })
      if (!result) throw createError.NotFound('کاربر یافت نشد!')
      const deleteUser = await UserModel.deleteOne({ _id: id })
      if (deleteUser.deletedCount == 0)
        throw createError.InternalServerError('متاسفانه کاربر حذف نشد، لطفا مجددا تلاش کنید!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'کاربر با موفقیت حذف شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }
  
  async checkExistRole(id) {
    const role = await RolesModel.findById(id)
    if (!role) throw createError.NotFound('نقش مورد نظر یافت نشد!')
    return true
  }
}
module.exports = {
  AdminUserController: new AdminUserController(),
}
