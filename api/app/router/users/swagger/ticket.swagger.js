/**
 * @swagger
 * /api/user/ticket/add-answer:
 *  post:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Create Tiket
 *          description: Add An Tiket In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
 *              example: Bearer YourToken...
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: parentID
 *              description: enter parentID
 *              in: formData
 *              required: false
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
 * /api/user/ticket/create-ticket:
 *  post:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Create Tiket
 *          description: Add An Tiket In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
 *              example: Bearer YourToken...
 *          -   name: topic
 *              description: enter topic
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: text
 *              description: enter text
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: department
 *              description: enter department
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: releventRobot
 *              description: enter releventRobot
 *              in: formData
 *              required: true
 *              type: string
 *              format : formData
 *          -   name: importTick
 *              description: enter importTick
 *              in: formData
 *              required: true
 *              type: string
 *              format : formData
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
 * /api/user/ticket/ticket-list:
 *  get:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Get All Tiket
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
 *              example: Bearer YourToken...
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/user/ticket/ticket-list/{id}:
 *  get:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Show All Childern Of Tiket By TiketId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
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
 * /api/user/ticket/show-oneTicket/{id}:
 *  get:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Get One Ticket
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
 *              example: Bearer YourToken...
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
 * /api/user/ticket/remove-ticket/{id}:
 *  delete:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Remove One Tiket By TiketId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
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
 * /api/user/ticket/edit-ticket/{id}:
 *  put:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Edit One Tiket By TiketId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
 *          -   name: id
 *              description: enter notifId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: topic
 *              description: enter topic
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: text
 *              description: enter text
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: department
 *              description: enter department
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: releventRobot
 *              description: enter releventRobot
 *              in: formData
 *              required: false
 *              type: string
 *              format : formData
 *          -   name: importTick
 *              description: enter importTick
 *              in: formData
 *              required: false
 *              type: string
 *              format : formData
 *          -   name: statustick
 *              description: enter statustick
 *              in: formData
 *              required: false
 *              type: string
 *              format : formData
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/user/ticket/edit-imagetiket/{id}:
 *  patch:
 *          tags : [User-Panel-( Ticket )]
 *          summary: Edit One Tiket By TiketId
 *          consumes:
 *             - multipart/form-data
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzM1MjM2MzEsImV4cCI6MTY3MzYwNjQzMX0.vf6JAVpK34QMCuH_xMdx6Z6BKq-ifMixNf60jrvUQag
 *          -   name: id
 *              description: enter notifId
 *              in: path
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: ticket
 *              type: file
 *          responses:
 *              200:
 *                  description: Success
 */
