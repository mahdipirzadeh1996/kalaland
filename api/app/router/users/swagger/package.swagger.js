/**
 * @swagger
 * /api/user/package/create-buypack:
 *  post:
 *          tags : [User-Panel-( Purchasees )]
 *          summary: Save User procurement
 *          description: Save User procurement In data Base
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzMwOTUwMDYsImV4cCI6MTY3MzE3NzgwNn0.N0psVyoSg4YTo92EntfavO0Eingx827ahLo7rSLP_6w
 *              example: Bearer YourToken...
 *          -   name: packId
 *              description: enter packId
 *              in: formData
 *              type: string
 *              required : true
 *          -   name: trades
 *              description: enter trades
 *              in: formData
 *              type: string
 *              required : true
 *          -   name: overallprofit
 *              description: enter overallprofit
 *              in: formData
 *              type: boolean
 *          -   name: transhash
 *              description: enter transhash
 *              in: formData
 *              type: string
 *              required : true
 *          -   name: startat
 *              description: enter startat
 *              in: formData
 *              type: string
 *              required : true
 *          -   name: loginId
 *              description: enter loginId
 *              in: formData
 *              type: string
 *              required : true
 *          -   name: maxpos
 *              description: enter maxpos
 *              in: formData
 *              type: integer
 *              required : true
 *          -   name: lotsize
 *              description: enter lotsize
 *              in: formData
 *              type: integer
 *              required : true
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
 *  @swagger
 * /api/user/package/package-list:
 *  get:
 *          tags : [User-Panel-( Purchasees )]
 *          summary: Get All Users Packages
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzMwOTUwMDYsImV4cCI6MTY3MzE3NzgwNn0.N0psVyoSg4YTo92EntfavO0Eingx827ahLo7rSLP_6w
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/user/package/package-list/{id}:
 *  get:
 *          tags : [User-Panel-( Purchasees )]
 *          summary: Get One Package Of Logined User By Package
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzMwOTUwMDYsImV4cCI6MTY3MzE3NzgwNn0.N0psVyoSg4YTo92EntfavO0Eingx827ahLo7rSLP_6w
 *          -   name: id
 *              description: enter Package Id
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 *  @swagger
 * /api/user/package/buypack-list-user:
 *  get:
 *          tags : [User-Panel-( Purchasees )]
 *          summary: Get All User Package
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzMwOTUwMDYsImV4cCI6MTY3MzE3NzgwNn0.N0psVyoSg4YTo92EntfavO0Eingx827ahLo7rSLP_6w
 *              example: Bearer YourToken...
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/user/package/remove-package/{id}:
 *  patch:
 *          tags : [User-Panel-( Purchasees )]
 *          summary: Remove Package Of Logined User By PackageID
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzMwOTUwMDYsImV4cCI6MTY3MzE3NzgwNn0.N0psVyoSg4YTo92EntfavO0Eingx827ahLo7rSLP_6w
 *          -   name: id
 *              description: enter PackageID
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/user/package/edit-package/{id}:
 *  put:
 *          tags : [User-Panel-( Purchasees )]
 *          summary: Edit One Package Of Logined User By PackageId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzMwOTUwMDYsImV4cCI6MTY3MzE3NzgwNn0.N0psVyoSg4YTo92EntfavO0Eingx827ahLo7rSLP_6w
 *          -   name: id
 *              description: enter PackageId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: lotsize
 *              description: enter lotsize
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: maxpos
 *              description: enter maxpos
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: loginId
 *              description: enter loginId
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: overallprofit
 *              description: enter overallprofit
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: trades
 *              description: enter trades
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: botstatus
 *              description: enter botstatus
 *              in: formData
 *              required: false
 *              type: boolean
 *          responses:
 *              200:
 *                  description: Success
 */
