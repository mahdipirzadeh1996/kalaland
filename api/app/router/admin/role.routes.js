const router = require('express').Router()

const {
  RoleController,
} = require('../../http/controller/admin/RBAC/admin.role.controller')
const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatiorMaper } = require('../../http/middlewares/chekErrors')
const { mongoIdValidator } = require('../../http/validations/public')

router.post('/add', verifyAccessToken, RoleController.createNewRole)
router.get('/list', verifyAccessToken, RoleController.getAllRoles)
router.delete(
  '/remove/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  RoleController.removeRole,
)
router.patch(
  '/update/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  RoleController.updateRoleByID,
)
module.exports = {
  RoleAdminRoutes: router,
}
