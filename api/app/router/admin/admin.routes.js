const router = require('express').Router()
const { PackageRoutes } = require('./package.routes')
const { RoleAdminRoutes } = require('./role.routes')
const { UserAdminRoutes } = require('./user.routes')
const { TicketAdminRoutes } = require('./ticket.routes')
const { NotifRoutes } = require('./notif.routes')
const { NewsRouter } = require('./news.routes')
const { BranchAdminRoutes } = require('./branch.routes')
const { ProductAdminRoutes } = require('./product.routes')
const { CommentAdminRoutes } = require('./comment.routes')

router.use('/user', UserAdminRoutes)
router.use('/role', RoleAdminRoutes)
router.use('/ticket', TicketAdminRoutes)
router.use('/product', ProductAdminRoutes)
router.use('/branch', BranchAdminRoutes)
router.use('/coment', CommentAdminRoutes)

router.use('/package', PackageRoutes)
router.use('/notif', NotifRoutes)
router.use('/news', NewsRouter)

module.exports = {
  adminRoutes: router,
}
