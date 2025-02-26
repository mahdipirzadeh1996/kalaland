/**
 * @swagger
 * /api/user/profile:
 *  get:
 *          tags : [User-Panel-(Profile)]
 *          summary: Get Your Info
 *          description: Get User Profile
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2MzU3MjgwOSwiZXhwIjoxNjYzNjU1NjA5fQ.uKpFj95aZn8G1izOwdBhJrQ9-2RBRG2D2_yn9C4d5Us
 *              example: Bearer YourToken...
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
 * /api/user/profile:
 *  post:
 *          tags : [User-Panel-(Profile)]
 *          summary: You Can Change All Field
 *          description: All Info
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2MzU3MjgwOSwiZXhwIjoxNjYzNjU1NjA5fQ.uKpFj95aZn8G1izOwdBhJrQ9-2RBRG2D2_yn9C4d5Us
 *              example: Bearer YourToken...
 *          -   name: frist_name
 *              description: enter frist_name
 *              in: formData
 *              type: string
 *          -   name: statusActive
 *              description: enter statusActive
 *              in: formData
 *              type: boolean
 *          -   name: statusEmail
 *              description: enter statusEmail
 *              in: formData
 *              type: boolean
 *          -   name: statustwoFactir
 *              description: enter statustwoFactir
 *              in: formData
 *              type: boolean
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
 * /api/user/profile-image:
 *  post:
 *          tags : [User-Panel-(Profile)]
 *          summary: Edit user Profile Avatar
 *          consumes:
 *             - multipart/form-data
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2MzU3MjgwOSwiZXhwIjoxNjYzNjU1NjA5fQ.uKpFj95aZn8G1izOwdBhJrQ9-2RBRG2D2_yn9C4d5Us
 *          -   in: formData
 *              name: image
 *              type: file
 *          responses:
 *              200:
 *                  description: Success
 */

