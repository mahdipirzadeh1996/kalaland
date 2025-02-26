
/**
 * @swagger
 * /api/user/notif/notif-list:
 *  get:
 *          tags : [User-Panel-( Notif )]
 *          summary: Get All Notif
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2Mzc1NzUyMiwiZXhwIjoxNjYzODQwMzIyfQ.2ti5pgnYHxzeTSUtzizVWDcA8GFzqZ7R9KiQMM44ZcE
 *          responses:
 *              200:
 *                  description: Success
 */

 /**
 * @swagger
 * /api/user/notif/notif-list/{id}:
 *  get:
 *          tags : [User-Panel-( Notif )]
 *          summary: Get One Notif By NotifId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2Mzc1NzUyMiwiZXhwIjoxNjYzODQwMzIyfQ.2ti5pgnYHxzeTSUtzizVWDcA8GFzqZ7R9KiQMM44ZcE
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
 * /api/user/notif/notif-list-user:
 *  get:
 *          tags : [User-Panel-( Notif )]
 *          summary: Get One Notif By NotifId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2Mzc1NzUyMiwiZXhwIjoxNjYzODQwMzIyfQ.2ti5pgnYHxzeTSUtzizVWDcA8GFzqZ7R9KiQMM44ZcE
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/user/notif/remove-notif/{id}:
 *  delete:
 *          tags : [User-Panel-( Notif )]
 *          summary: Get One Notif By NotifId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2Mzc1NzUyMiwiZXhwIjoxNjYzODQwMzIyfQ.2ti5pgnYHxzeTSUtzizVWDcA8GFzqZ7R9KiQMM44ZcE
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
 * /api/user/notif/edit-notif/{id}:
 *  put:
 *          tags : [User-Panel-( Notif )]
 *          summary: Get One Notif By NotifId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMWFlZmEzMTg3ZTYxOGE2NTA0ZDEzNiIsImlhdCI6MTY2MzQxNTI4OSwiZXhwIjoxNjYzNDk4MDg5fQ.htIZJfx05D2vqZi-RjT_Fl8UHDFj7nQdQSslOcX8hvg
 *          -   name: id
 *              description: enter notifId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: title
 *              description: enter title
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: descri
 *              description: enter descri
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: type
 *              description: enter type
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: date
 *              description: enter date
 *              in: formData
 *              required: false
 *              type: string
 *              format : date-time
 *          responses:
 *              200:
 *                  description: Success
 */
