/**
 * @swagger
 * /admin/ticket/add:
 *  post:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Create Tiket
 *          description: Add An Tiket In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *              example: Bearer YourToken...
 *          -   name: userId
 *              description: enter userId
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: topic
 *              description: enter topic
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: text
 *              description: enter text
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
 * /admin/ticket/answer-ticket:
 *  post:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Create Tiket
 *          description: Answer a Tiket In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *              example: Bearer YourToken...
 *          -   name: userId
 *              description: enter userId
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: ticketNumber
 *              description: enter ticketNumber
 *              in: formData
 *              required: true
 *              type: number
 *          -   name: text
 *              description: enter text
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: parentId
 *              description: enter parentId
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
 * /admin/ticket/one-ticket/{id}:
 *  get:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Get One Tiket By TiketId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *          -   name: id
 *              description: enter Ticket Id
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/one-first-admin-ticket/{id}:
 *  get:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Get First Ticket Of Admin By AdminId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *          -   name: id
 *              description: enter Admin Id
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/admin/ticket/edit-ticket/{id}:
 *  put:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Edit One Tiket By TiketId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *          -   name: id
 *              description: enter ticketId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: topic
 *              description: enter topic
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: statusTick
 *              description: enter statusTick
 *              in: formData
 *              required: false
 *              type: boolean
 *              format : formData
 *          -   name: text
 *              description: enter text
 *              in: formData
 *              required: false
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/remove-ticket/{id}:
 *  delete:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Remove One Tiket By TiketId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *          -   name: id
 *              description: enter TiketId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/close-ticket/{id}:
 *  patch:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Closed All Tiket By TiketId
 *          consumes:
 *             - multipart/form-data
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *          -   name: id
 *              description: enter notifId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/all-conversation:
 *  get:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Get All Tiket Conversation
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *              example: Bearer YourToken...
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/one-conversation/{id}:
 *  get:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Get One Conversation By Ticket Id
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *              example: Bearer YourToken...
 *          -   name: id
 *              description: enter TiketId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/image/{id}:
 *  patch:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Upload Tiket Image By TiketId
 *          consumes:
 *             - multipart/form-data
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *          -   name: id
 *              description: enter productId
 *              in: path
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: image
 *              type: file
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/ticket/all-open:
 *  get:
 *          tags : [Admin-Panel( Tiket )]
 *          summary: Get All Open Tiket
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1NjI0MTIsImV4cCI6MTY3MzY0NTIxMn0.C7Il1Q5pQfwNruzLu2-Ng7DXwsQCkdR9agsdBuKEOw8
 *              example: Bearer YourToken...
 *          responses:
 *              200:
 *                  description: Success
 */
