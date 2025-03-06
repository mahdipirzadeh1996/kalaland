const router = require('express').Router()

const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatorMaper } = require('../../http/middlewares/chekErrors')
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
  expressValidatorMaper,
  AdminBranchController.updateBranch,
)

router.delete(
  '/remove-branch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
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
  expressValidatorMaper,
  AdminSubBranchController.updateSubBranch,
)

router.delete(
  '/remove-subbranch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  AdminSubBranchController.removeSubBranch,
)

module.exports = {
  BranchAdminRoutes: router,
}
