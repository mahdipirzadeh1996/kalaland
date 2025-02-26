/**
 * @swagger
 * /admin/branch/create-branch:
 *  post:
 *          tags : [Admin-Panel( Branch )]
 *          summary: Create Branch
 *          description: Add An Branch In DataBase
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
 * /admin/branch/branch-list:
 *  get:
 *          tags : [Admin-Panel( Branch )]
 *          summary: Get All Branch
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
 * /admin/branch/edit-branch/{id}:
 *  put:
 *          tags : [Admin-Panel( Branch )]
 *          summary: Get One Branch By BranchId
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
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: false
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/branch/remove-branch/{id}:
 *  delete:
 *          tags : [Admin-Panel( Branch )]
 *          summary: Get One Branch By BranchId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter branchId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/branch/create-subbranch:
 *  post:
 *          tags : [Admin-Panel( SubBranch )]
 *          summary: Create SubBranch
 *          description: Add An Branch In DataBase
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
 *          -   name: parentBranch
 *              description: enter parentBranch
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
 * /admin/branch/subbranch-list:
 *  get:
 *          tags : [Admin-Panel( SubBranch )]
 *          summary: Get All SubBranch
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
 * /admin/branch/edit-subbranch/{id}:
 *  put:
 *          tags : [Admin-Panel( SubBranch )]
 *          summary: Get One SubBranch By SubBranchId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMWFlZmEzMTg3ZTYxOGE2NTA0ZDEzNiIsImlhdCI6MTY2MzQxNTI4OSwiZXhwIjoxNjYzNDk4MDg5fQ.htIZJfx05D2vqZi-RjT_Fl8UHDFj7nQdQSslOcX8hvg
 *          -   name: id
 *              description: enter subBranchId
 *              in: path
 *              required: true
 *              type: string
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: parentBranch
 *              description: enter parentBranch
 *              in: formData
 *              required: false
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/branch/remove-subbranch/{id}:
 *  delete:
 *          tags : [Admin-Panel( SubBranch )]
 *          summary: Get One SubBranch By SubBranchId
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3NTg3MTA5MyIsInVzZXJJRCI6IjYzMWFmYmJhZDE1ZDAwYmYyNjk2ZjIwMSIsImlhdCI6MTY3MjIzMDE0MCwiZXhwIjoxNjcyMzEyOTQwfQ.O4NC7pt4f5HM37bIP9FZ2xmhc4RYzERzqR-7gsEeH8Y
 *          -   name: id
 *              description: enter subBranchId
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */
