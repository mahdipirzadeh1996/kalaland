const router = require('express').Router()

const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatorMaper } = require('../../http/middlewares/chekErrors')
const { mongoIdValidator } = require('../../http/validations/public')
const {
  AdminProductController,
} = require('../../http/controller/admin/admin.products.controller')
const { uploadFile } = require('../../utils/multer')

router.post(
  '/create-product',
  verifyAccessToken,
  AdminProductController.createProduct,
)

router.get(
  '/product-list',
  verifyAccessToken,
  AdminProductController.getAllProducts,
)

router.get(
  '/product-list/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  AdminProductController.showOneProduct,
)

router.put(
  '/edit-product/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  AdminProductController.updateProduct,
)

router.delete(
  '/remove-product/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  AdminProductController.removeProductById,
)

router.patch(
  '/image/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  uploadFile.single('product'),
  AdminProductController.uploadProductImage,
)

router.patch(
  '/edit-image/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  uploadFile.single('product'),
  AdminProductController.updateImage,
)

module.exports = {
  ProductAdminRoutes: router,
}