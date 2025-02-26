//------------------otp
/**
 * @swagger
 *  tags :
 *    -  name : User-Panel-(Profile)
 *       description : Create Edite Delete ... profile
 *    -  name : User-Panel( Chang Password)
 *       description : Create OTP and Check that and save new password
 *    -  name : User-Panel-( Purchasees )
 *       description : Buy a Package and Save edit in dataBase
 */
/**
 * @swagger
 * /api/user/getOtpSendMassage:
 *  post:
 *          tags : [User-Panel( Chang Password)]
 *          summary: Login otp
 *          description: one time password (OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
 *              value : +989379300432
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
 * /api/user/getOtp:
 *  post:
 *          tags : [User-Panel( Chang Password)]
 *          summary: Login otp
 *          description: one time password (OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
 *              value : +989379300432
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
 * /api/user/checkOtp:
 *  post:
 *          tags : [User-Panel( Chang Password)]
 *          summary: Login otp
 *          description: one time password (OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
 *              value : +989379300432
 *          -   name: code
 *              description: enter code
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
 * /api/user/checkOtp:
 *  post:
 *          tags : [User-Panel( Chang Password)]
 *          summary: Login otp
 *          description: one time password (OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
 *              value : +989379300432
 *          -   name: code
 *              description: enter code
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
 * /api/user/refresh-token:
 *      post:
 *          tags : [User-Panel( Chang Password)]
 *          summary: Send Refresh Token For Get New Token And Refresh Token
 *          description: Refresh Token
 *          parameters:
 *          -   name: refreshToken
 *              description: Do it now
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not Found
 */
/**
 * @swagger
 * /api/user/changepassword/:
 *  post:
 *          tags : [User-Panel( Chang Password)]
 *          summary: Get One Package By Package
 *          parameters:
 *          -   in: header
 *              name: token
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYzMGRiMGQxYjBiN2VjNjZjZDk0ODEzNSIsImlhdCI6MTY2MzU3MjgwOSwiZXhwIjoxNjYzNjU1NjA5fQ.uKpFj95aZn8G1izOwdBhJrQ9-2RBRG2D2_yn9C4d5Us
 *          -   name: password
 *              description: enter password
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: confirm_password
 *              description: enter confirm_password
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
 *              value : +989379300432
 *          -   name: code
 *              description: enter code
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


