const router = require('express').Router()

const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatiorMaper } = require('../../http/middlewares/chekErrors')
const { mongoIdValidator } = require('../../http/validations/public')
const {
  AdminUserController,
} = require('../../http/controller/admin/admin.user.controller')

router.post('/create-user', verifyAccessToken, AdminUserController.createUser)
router.get('/user-list', verifyAccessToken, AdminUserController.showAllUser) 
router.get(
  '/user-list/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminUserController.showOneUserById,
)
router.delete(
  '/remove-user/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminUserController.removeUser,
)
router.put(
  '/edit-user/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminUserController.updateUser,
)
router.put(
  '/edit-statusActive/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminUserController.updateStatusActive,
)

module.exports = {
  UserAdminRoutes: router,
}
