const createError = require('http-errors')
const { StatusCodes: HttpSatatus } = require('http-status-codes')
const { default: mongoose } = require('mongoose')

class AdminFavoriteController extends Controller {

}
module.exports = {
  AdminFavoriteController: new AdminFavoriteController(),
}