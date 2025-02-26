/**
 * @swagger
 * /user/pay/payment:
 *  post:
 *          tags : [User-Panel-( Payment )]
 *          summary: Create  Payment
 *          description: Add An Payment In DataBase
 *          parameters:
 *          -   in: header
 *              name: token
 *              value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIrOTg5Mzc5MzAwNDMyIiwidXNlcklEIjoiNjMxYWVmYTMxODdlNjE4YTY1MDRkMTM2Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2NzI4NjE4NTQsImV4cCI6MTY3Mjk0NDY1NH0.PA_xChOlz2-lgr5LmEQeAPiCKobTwp6rJz5urN2Qxo4
 *              example: Bearer YourToken...
 *          -   name: userId
 *              description: enter userId
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: txn_id
 *              description: enter txn_id
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: paymentDate
 *              description: enter paymentDate
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: amount
 *              description: enter amount
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
