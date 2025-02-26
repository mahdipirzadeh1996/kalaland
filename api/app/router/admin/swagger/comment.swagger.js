/**
 * @swagger
 * /admin/comment/create-comment:
 *  post:
 *          tags : [Admin-Panel( Comment )]
 *          summary: Create Comment
 *          description: Add An Comment In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: productId
 *              description: enter productId
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
 * /admin/comment/comment-list:
 *  get:
 *          tags : [Admin-Panel( Comment )]
 *          summary: Get All Comment
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/comment/edit-comment/{id}:
 *  put:
 *          tags : [Admin-Panel( Comment )]
 *          summary: Get One Comment By CommentId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMWFlZmEzMTg3ZTYxOGE2NTA0ZDEzNiIsImlhdCI6MTY2MzQxNTI4OSwiZXhwIjoxNjYzNDk4MDg5fQ.htIZJfx05D2vqZi-RjT_Fl8UHDFj7nQdQSslOcX8hvg
 *          -   name: id
 *              description: enter branchId
 *              in: path
 *              required: true
 *              type: string
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
 * /admin/comment/remove-comment/{id}:
 *  delete:
 *          tags : [Admin-Panel( Comment )]
 *          summary: Get One Comment By CommentId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter commentId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */