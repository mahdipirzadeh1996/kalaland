const { UserModel } = require("../../models/users");
const { tokenVerifyJWTToken } = require("../../modules/function");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");
const checkLogin = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;
        if (!authorization) throw { status: 401, message: "Please login" }
        let token = authorization.split(" ")?.[1];
        if (!token) throw { status: 401, message: "Please login" }
        const result = tokenVerifyJWTToken(token);
        const { username } = result;
        const user = await UserModel.findOne({ username }, { password: 0 });
        if (!user) throw { status: 401, message: "User Not Found" }
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}
function verifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["token"]?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) {
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) return next(createHttpError.Unauthorized("Please login"));

            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });

            if (!user) return next(createHttpError.Unauthorized("User Not Found"))
            req.user = user;
            return next();
        })

    }
    else
        return next(createHttpError.Unauthorized("Please login"))
}
module.exports = {
    checkLogin,
    verifyAccessToken
}