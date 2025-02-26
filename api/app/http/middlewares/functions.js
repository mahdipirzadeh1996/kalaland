const { UserModel } = require("../../models/users");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("../../utils/constans");
const redisClient = require("../../utils/init_redis");
function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
      roles: user.roles,
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;
    const option = {
      expiresIn: "23h",
    };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(createError.InternalServerError("Server Error "));
      resolve(token);
    });
  });
}
async function VerifyRefreshToken(token) {
  return new Promise(async (resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) reject(createError.Unauthorized("Please login"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createError.Unauthorized("User Not Found"));
      const refreshToken = await redisClient.get(String(user._id));
      if (token === refreshToken) return resolve(mobile);
      reject(createError.Unauthorized("Please login"));
    });
  });
}
function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const secret = REFRESH_TOKEN_SECRET_KEY;
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, option, async (err, token) => {
      if (err) reject(createError.InternalServerError("Server Error "));
      await redisClient.SETEX(String(userId), (356 * 24 * 60 * 60), token);

      resolve(token);
    });
  });
}
module.exports = {
  SignAccessToken,
  VerifyRefreshToken,
  SignRefreshToken,
};
