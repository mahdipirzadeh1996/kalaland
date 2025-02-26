const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const { UserModel } = require("../../../models/users");
const Controller = require("../controller");
const {
  googleAuthenticatorGenerator,
  qrProducer,
  googleAuthenticatorChecker,
} = require("../../../utils/function");
const { GoogleAuthModel } = require("../../../models/googleAuth");
class UserAuthenticatorController extends Controller {
  //create
  async createGoogleAuthenticator(req, res, next) {
    try {
      const user = req.user;
      if (user.statustwoFactir)
        throw createError.BadRequest(`Your two-step code is active`);

      const generatedGoogleAuth = googleAuthenticatorGenerator();
      const qrUser = await qrProducer(generatedGoogleAuth.otpauth_url, {
        type: "image/png",
      });
      let query = { userID: user._id };
      let update = {
        $set: {
          userID: user._id,
          ascii: generatedGoogleAuth.ascii,
          hex: generatedGoogleAuth.hex,
          base32: generatedGoogleAuth.base32,
          otpauth_url: generatedGoogleAuth.otpauth_url,
        },
      };
      let options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      };
      let result = await GoogleAuthModel.findOneAndUpdate(
        query,
        update,
        options
      );
      if (result) {
        return res.status(HttpSatatus.CREATED).json({
          data: {
            statusCode: HttpSatatus.CREATED,
            success:true,
            message: "Google Authenticator made successfully",
            result,
            qrUser,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  //chaek
  async cheakGoogleAuthenticator(req, res, next) {
    try {
      const user = req.user;
      if (user.statustwoFactir)
        throw createError.BadRequest(`Your two-step code is active`);
      const googleAuth = await GoogleAuthModel.findOne({ userID: user._id });
      if (googleAuth.status)
        throw createError.BadRequest(`Your two-step code is active`);
      const code = req.body.code;
      const cheakGoogleAuth = googleAuthenticatorChecker(
        code,
        googleAuth.ascii
      );
      console.log(cheakGoogleAuth)
      if (cheakGoogleAuth) {
        const updateGoogle = await GoogleAuthModel.updateOne(
          { _id: googleAuth._id },
          { $set: { status: true } }
        );
        const updateUser = await UserModel.updateOne(
          { _id: user._id },
          { $set: { statustwoFactir: true } }
        );
        if (updateUser.modifiedCount > 0 && updateGoogle.modifiedCount > 0) {
          return res.status(HttpSatatus.OK).json({
            data: {
              statusCode: HttpSatatus.OK,
              success:true,
              message: "Your two-step code has been activated",
            },
          });
        }
        throw createError.InternalServerError(`Can not save data in Database`);
      }

      throw createError.BadRequest(`The entered code or secret is not correct`);
    } catch (error) {
      next(error);
    }
  }
  //disable
  async disableGoogleAuthenticator(req, res, next) {
    try {
      const user = req.user;
      console.log(user)
      if (!user.statustwoFactir)
        throw createError.BadRequest(`Your two-step code is not active`);
      const updateUser = await UserModel.updateOne(
        { _id: user._id },
        { $set: { statustwoFactir: false } }
      );
      if (updateUser.modifiedCount == 0)
        throw createError.InternalServerError(`Can not save data in Database`);
      const updateGoogleAuth = await GoogleAuthModel.updateOne(
        { userID: user._id },
        { $set: { status: false ,ascii:''} }
      );
      if (updateGoogleAuth.modifiedCount == 0)
        throw createError.InternalServerError(`Can not save data in Database`);
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success:true,
          message: "Your two-step code has been disabled",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  UserAuthenticatorController: new UserAuthenticatorController(),
};
