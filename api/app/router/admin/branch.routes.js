const router = require('express').Router()

const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatiorMaper } = require('../../http/middlewares/chekErrors')
const { mongoIdValidator } = require('../../http/validations/public')
const {
  AdminBranchController,
  AdminSubBranchController,
} = require('../../http/controller/admin/admin.branch.controller')

router.post(
  '/create-branch',
  verifyAccessToken,
  AdminBranchController.createBranch,
)

router.get(
  '/branch-list',
  verifyAccessToken,
  AdminBranchController.showAllBranches,
)

router.put(
  '/edit-branch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminBranchController.updateBranch,
)

router.delete(
  '/remove-branch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminBranchController.removeBranch,
)

/////////////////////////////////////////////////////////////

router.post(
  '/create-subbranch',
  verifyAccessToken,
  AdminSubBranchController.createSubBranch,
)

router.get(
  '/subbranch-list',
  verifyAccessToken,
  AdminSubBranchController.showAllSubBranches,
)

router.put(
  '/edit-subbranch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminSubBranchController.updateSubBranch,
)

router.delete(
  '/remove-subbranch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatiorMaper,
  AdminSubBranchController.removeSubBranch,
)

module.exports = {
  BranchAdminRoutes: router,
}
