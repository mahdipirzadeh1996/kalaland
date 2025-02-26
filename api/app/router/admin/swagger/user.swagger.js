
/**
 * @swagger
 * /admin/user/create-user:
 *  post:
 *          tags : [Admin-Panel( User )]
 *          summary: Create User
 *          description: Add An User In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: family
 *              description: enter family
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: roles
 *              description: enter roles
 *              in: formData
 *              required: true
 *              type: array
 *          -   name: password
 *              description: enter password
 *              in: formData
 *              required: true
 *              type: string
 *              format : password
 *          -   name: confirm_password
 *              description: enter confirm_password
 *              in: formData
 *              required: true
 *              type: string
 *              format : password
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
 * /admin/user/user-list:
 *  get:
 *          tags : [Admin-Panel( User )]
 *          summary: Get All User
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
 * /admin/user/user-list/{id}:
 *  get:
 *          tags : [Admin-Panel( User )]
 *          summary: Get One User By UserId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter userId
 *              in: path
 *              required: true
 *              type: string
 *          responses: 
 *              200:
 *                  description: Success
 */

 /**
 * @swagger
 * /admin/user/remove-user/{id}:
 *  delete:
 *          tags : [Admin-Panel( User )]
 *          summary: Get One User By UserId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter userId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

 /**
 * @swagger
 * /admin/user/edit-user/{id}:
 *  put:
 *          tags : [Admin-Panel( User )]
 *          summary: Get One User By UserId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMWFlZmEzMTg3ZTYxOGE2NTA0ZDEzNiIsImlhdCI6MTY2MzQxNTI4OSwiZXhwIjoxNjYzNDk4MDg5fQ.htIZJfx05D2vqZi-RjT_Fl8UHDFj7nQdQSslOcX8hvg
 *          -   name: id
 *              description: enter userId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: family
 *              description: enter family
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: roles
 *              description: enter roles
 *              in: formData
 *              required: false
 *              type: array
 *          -   name: password
 *              description: enter password
 *              in: formData
 *              required: false
 *              type: string
 *              format : password
 *          -   name: confirm_password
 *              description: enter confirm_password
 *              in: formData
 *              required: false
 *              type: string
 *              format : password
 *          -   name: statusActive
 *              description: enter statusActive
 *              in: formData
 *              type: string
 *              required: false
 *              format : boolean
 *          responses:
 *              200:
 *                  description: Success
 */

 /**
 * @swagger
 * /admin/user/edit-statusActive/{id}:
 *  put:
 *          tags : [Admin-Panel( User )]
 *          summary: Get One User By UserId
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
 *          -   name: statusActive
 *              description: enter statusActive
 *              in: formData
 *              required: false
 *              type: boolean
 *          responses:
 *              200:
 *                  description: Success
 */