/**
 * @swagger
 * /admin/product/create-product:
 *  post:
 *          tags : [Admin-Panel( product )]
 *          summary: Create Product
 *          description: Add An Product In DataBase
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
 *          -   name: model
 *              description: enter model
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: description
 *              description: enter description
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: branch
 *              description: enter branch
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: subBranch
 *              description: enter subBranch
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: buyPrice
 *              description: enter buyPrice
 *              in: formData
 *              required: true
 *              type: nnumber
 *          -   name: sellPrice
 *              description: enter sellPrice
 *              in: formData
 *              required: true
 *              type: number
 *          -   name: image
 *              description: enter image
 *              in: formData
 *              required: true
 *              type: file
 *          -   name: storage
 *              description: enter storage
 *              in: formData
 *              required: true
 *              type: number
 *          -   name: off
 *              description: enter off
 *              in: formData
 *              required: true
 *              type: number
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
 * /admin/product/product-list:
 *  get:
 *          tags : [Admin-Panel( Product )]
 *          summary: Get All Product
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
 * /admin/product/product-list/{id}:
 *  get:
 *          tags : [Admin-Panel( Product )]
 *          summary: Get One Product By ProductId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter productId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/product/edit-product/{id}:
 *  put:
 *          tags : [Admin-Panel( Product )]
 *          summary: Get One Product By ProductId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMWFlZmEzMTg3ZTYxOGE2NTA0ZDEzNiIsImlhdCI6MTY2MzQxNTI4OSwiZXhwIjoxNjYzNDk4MDg5fQ.htIZJfx05D2vqZi-RjT_Fl8UHDFj7nQdQSslOcX8hvg
 *          -   name: id
 *              description: enter productId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: model
 *              description: enter model
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: description
 *              description: enter description
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: branch
 *              description: enter branch
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: subBranch
 *              description: enter subBranch
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: buyPrice
 *              description: enter buyPrice
 *              in: formData
 *              required: false
 *              type: number
 *          -   name: sellPrice
 *              description: enter sellPrice
 *              in: formData
 *              required: false
 *              type: number
 *          -   name: storage
 *              description: enter storage
 *              in: formData
 *              required: false
 *              type: number
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/product/remove-product/{id}:
 *  delete:
 *          tags : [Admin-Panel( Product )]
 *          summary: Get One Product By ProductId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter productId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/product/image/{id}:
 *  patch:
 *          tags : [Admin-Panel( Product )]
 *          summary: Upload Product Image By ProductId
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
 * /admin/product/edit-image/{id}:
 *  patch:
 *          tags : [Admin-Panel( Product )]
 *          summary: Upload Product Image By ProductId
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
