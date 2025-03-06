const router = require('express').Router()

const { verifyAccessToken } = require('../../http/middlewares/autoLogin')
const { expressValidatorMaper } = require('../../http/middlewares/chekErrors')
const { mongoIdValidator } = require('../../http/validations/public')
const {
  AdminCommentController,
} = require('../../http/controller/admin/admin.comment.controller')

router.post(
  '/create-comment',
  verifyAccessToken,
  AdminCommentController.createComment,
)

router.get(
  '/comment-list',
  verifyAccessToken,
  AdminCommentController.showAllProductComment,
)

router.put(
  '/edit-comment/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  AdminCommentController.updateComment,
)

router.delete(
  '/remove-branch/:id',
  verifyAccessToken,
  mongoIdValidator(),
  expressValidatorMaper,
  AdminCommentController.removeComment,
)

module.exports = {
    CommentAdminRoutes: router,
  }
  