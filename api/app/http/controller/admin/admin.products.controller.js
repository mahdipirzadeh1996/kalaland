const createError = require('http-errors')
const { StatusCodes: HttpSatatus } = require('http-status-codes')

const { ProductsModel } = require('../../../models/products')
const { deleteFileInPublic } = require('../../../utils/function')

class AdminProductController {
  async createProduct(req, res, next) {
    try {
      const { product } = req.body
      const result = await ProductsModel.create({
        name: product.name,
        model: product.model,
        description: product.description,
        branch: product.branch,
        subBranch: product.subBranch,
        buyPrice: product.buyPrice,
        sellPrice: product.sellPrice,
        image: product.image,
        storage: product.storage,
        off: product.off,
        author: req.user._id,
      })
      if (!result)
        throw createError.Unauthorized(
          'متاسفانه محصول اضافه نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: 'محصول با موفقیت اضافه شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const result = await ProductsModel.find().sort({ createdAt: -1 }).limit(3)
      if (!result) throw createError.NotFound('محصولی موجود نیست!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'محصولات با موفقیت یافت شدند',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async showOneProduct(req, res, next) {
    try {
      const productId = req.params.id
      const result = await ProductsModel.findOne({ _id: productId })
      if (!result) throw createError.NotFound('محصول یافت نشد!')
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'محصول با موفقیت یافت شد',
          result,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductsModel.find({ _id: productId })
      if (!product) throw createError.NotFound('محصول یافت نشد!')

      let data = req.body.data
      let fields = [
        'name',
        'model',
        'description',
        'branch',
        'subBranch',
        'buyPrice',
        'sellPrice',
        'storage',
        'off',
      ]
      const nullisData = process.env.NULLisData
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        if (nullisData.includes(value)) delete data[key]
      })
      const result = await ProductsModel.updateOne(
        { _id: productId },
        { $set: data },
      )
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
        'متاسفانه ویرایش انجام نشد، لطفا مجددا تلاش کنید!',
      )
    } catch (error) {
      next(error)
    }
  }

  async removeProductById(req, res, next) {
    try {
      const productId = req.params.id
      const result = await ProductsModel.findOne({ _id: productId })
      if (!result) throw createError.NotFound('محصول یافت نشد!')
      const deletePackage = await ProductsModel.deleteOne({ _id: packageId })
      if (deletePackage.deletedCount == 0)
        throw createError.InternalServerError(
          'متاسفانه محصول حذف نشد، لطفا مجددا تلاش کنید!',
        )
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: 'محصول با موفقیت حذف شد',
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //image
  async uploadProductImage(req, res, next) {
    try {
      const image = path
        .join(req?.body?.fileUploadPath, req?.body?.filename)
        .replace(/[\\\\]/gm, '/')
      req.body.image = image
      const productId = req.params.id

      console.log(image)

      const product = await ProductsModel.findOne({ _id: productId })
      if (!product)
        throw createError.NotFound(
          'متاسفانه محصول اضافه نشد، لطفا مجددا تلاش کنید!',
        )

      const result = await ProductsModel.updateOne(
        { _id: productId },
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

  async updateImage(req, res, next) {
    try {
      const { image } = req.body
      const productId = req.params.id
      const product = await PackageModel.findOne({ _id: productId })
      if (!product) throw { status: 404, message: 'محصول یافت نشد!' }

      const result = await ProductsModel.updateOne(
        { _id: productId },
        { $set: { image } },
      )
      if (result.modifiedCount > 0) {
        deleteFileInPublic(product.image)

        return res.status(200).json({
          status: 200,
          success: true,
          message: 'تصویر با موفقیت تغییر کرد',
        })
      }
      throw {
        status: 400,
        message: 'متاسفانه تصویر تغییر نکرد، لطفا مجددا تلاش کنید!',
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  AdminProductController: new AdminProductController(),
}
