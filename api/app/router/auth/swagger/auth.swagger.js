/**
 * @swagger
 *  tags :
 *      name : User-Authentication
 *      description : User-Auth Section
 */
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *          tags : [User-Authentication]
 *          summary: Create New User
 *          description: Add An User In DataBase
 *          parameters:
 *          -   name: name
 *              description: enter name
 *              in: formData
 *              required: true
 *              type: string
 *          -   family: family
 *              description: enter family
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: mobile
 *              description: enter mobile
 *              in: formData
 *              required: true
 *              type: string
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
 * /auth/sendemail:
 *  post:
 *          tags : [ User-Authentication]
 *          summary: Get One Notif By NotifId
 *          parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2IiwiaWF0IjoxNjYzNDM5MzgyLCJleHAiOjE2NjM1MjIxODJ9.SrnLsuMxLNogXfZHXyjz5qjv-d4_wkqZOvYcMLtA_r0
 *          -   name: email
 *              description: enter email
 *              value : pirzadehmahdi1222@gmail.com
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
* @swagger
* /api/auth/checkEmailOtp:
*  post:
*          tags : [User-Authentication]
*          summary: Login otp
*          description: one time password (OTP) login
*          parameters:
*          -   name: email
*              description: enter email
*              in: formData
*              required: true
*              type: string
*              value : davodbasiri95@gmail.com
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
 * /api/auth/verifyemail:
 *  post:
 *          tags : [ User-Authentication]
 *          summary: Get One Notif By NotifId
 *          parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer YourToken...
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2IiwiaWF0IjoxNjYzNDM5MzgyLCJleHAiOjE2NjM1MjIxODJ9.SrnLsuMxLNogXfZHXyjz5qjv-d4_wkqZOvYcMLtA_r0
 *          -   name: email
 *              description: enter Email
 *              value : davodbasiri95@gmail.com
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *          tags : [User-Authentication]
 *          summary: Login User
 *          description: Return Token
 *          parameters:
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: enter password
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
 * /api/auth/getOtp:
 *  post:
 *          tags : [User-Authentication]
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
 * /api/auth/checkOtp:
 *  post:
 *          tags : [User-Authentication]
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
