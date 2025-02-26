/**
 * @swagger
 * /admin/role/add:
 *  post:
 *          tags : [Admin-Panel( Role )]
 *          summary: Create New Role
 *          description: Add An Role In DataBase
 *          parameters:
 *          -   in: header
 *              name:  token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzI3Njc0NTgsImV4cCI6MTY3Mjg1MDI1OH0.cbDi2QbXoK_G96Rgtf-XOH6c6Zc6rsXGTS192WBcIPI
 *          -   name: title
 *              description: the title of role
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 * /admin/role/edit/{id}:
 *  patch:
 *          tags : [Admin-Panel( Role )]
 *          summary: Create New Role
 *          description: Add An Role In DataBase
 *          parameters:
 *          -   in: header
 *              name:  token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzI3Njc0NTgsImV4cCI6MTY3Mjg1MDI1OH0.cbDi2QbXoK_G96Rgtf-XOH6c6Zc6rsXGTS192WBcIPI
 *          -   name: id
 *              description: enter roleId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: title
 *              description: the title of role
 *              in: formData
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 * /admin/role/list:
 *  get:
 *          tags : [Admin-Panel( Role )]
 *          summary: Show list Of Role
 *          description: Show list Of Role
 *          parameters:
 *          -   in: header
 *              name:  token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzI3Njc0NTgsImV4cCI6MTY3Mjg1MDI1OH0.cbDi2QbXoK_G96Rgtf-XOH6c6Zc6rsXGTS192WBcIPI
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/role/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel( Role )]
 *          summary: remove the Role
 *          parameters:
 *          -   in: header
 *              name:  token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzI3Njc0NTgsImV4cCI6MTY3Mjg1MDI1OH0.cbDi2QbXoK_G96Rgtf-XOH6c6Zc6rsXGTS192WBcIPI
 *          -   name: id
 *              description: enter roleId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: removed the Role
 * 
 */