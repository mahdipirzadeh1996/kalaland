const bcrypt = require("bcrypt");
const { UserModel } = require("../../../models/users");
const { hashString, tokenGenerator } = require("../../../modules/function");
const {
  SignAccessToken,
  SignRefreshToken,
} = require("../../middlewares/functions");
const nodemailer = require("nodemailer");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { RandomNumberGenerator } = require("../../../utils/function");
const Controller = require("../controller");
const { phonenumber } = require("../../validations/auth");
const { checkOtpSchema } = require("../../validations/users/auth.schema");
const { CodeModel } = require("../../../models/code");
const { set } = require("mongoose");
const requestIp = require("request-ip");
const { object } = require("joi");
module.exports = new (class AuthController extends Controller {
  async register(req, res, next) {
    try {
      const { userData, code } = req.body;

      // Validate OTP code format
      if (!/^[0-9]{4}$/.test(code)) {
        throw createError.Unauthorized(
          "لطفا کد ارسال شده را به درستی وارد کنید!"
        );
      }

      // Find the OTP record in the database
      const otpRecord = await CodeModel.findOne({ email: userData.email });
      if (!otpRecord) {
        throw createError.NotFound("کد ارسال نشد لطفا مجددا تلاش کنید!");
      }

      // Validate OTP code
      if (otpRecord.code !== code) {
        throw createError.Unauthorized("کد اشتباه است!");
      }

      // Check if OTP is expired
      if (otpRecord.expiresIn < Date.now()) {
        throw createError.Unauthorized("اعتبار کد ارسالی به پایان رسید!");
      }

      // Delete OTP record
      await CodeModel.deleteOne({ email: userData.email });

      // Hash the password
      const hashPassword = hashString(userData.password);

      // Create the user
      const user = await UserModel.create({
        password: hashPassword,
        email: userData.email,
        mobile: userData.mobile,
        name: userData.name,
        family: userData.family,
      });

      if (!user) {
        throw createError.InternalServerError(
          "متاسفانه ثبت نام انجام نشد، لطفا مجددا تلاش کنید!"
        );
      }

      const accessToken = "Bearer " + (await SignAccessToken(user._id));

      // Save the JWT in an HTTP-only cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: false, // Set to false for HTTP in development
        sameSite: "lax", // Use "lax" for local development
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });

      user.token = accessToken;
      await user.save();

      // Return success response
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "ثبت نام با موفقیت انجام شد",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const clientIp = req.ip.substring(7);
      const user = await UserModel.findOne({ email });

      if (!user) throw { status: 404, message: "حسابی با این ایمیل یافت نشد!" };

      const compereResult = bcrypt.compareSync(password, user.password);
      if (!compereResult)
        throw { status: 404, message: "گذر واژه اشتباه می باشد!" };

      const accessToken = "Bearer " + (await SignAccessToken(user._id));

      // Save the JWT in an HTTP-only cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: false, // Set to false for HTTP in development
        sameSite: "lax", // Use "lax" for local development
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });

      user.token = accessToken;
      await user.save();

      return res.status(200).json({
        status: 200,
        success: true,
        message: "احراز هویت با موفقیت انجام شد",
        user,
        clientIp,
      });
    } catch (error) {
      next(error);
    }
  }
  async check(req, res, next) {
    try {
      const user = req.user;

      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      // Clear the token cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Set to false for HTTP in development
        sameSite: "lax", // Use "lax" for local development
      });

      return res.status(200).json({
        status: 200,
        success: true,
        message: "خروج از حساب کاربری با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user)
        throw createError.NotFound("The email or password is incorrect");
      const compereResult = bcrypt.compareSync(password, user.password);
      if (!compereResult)
        throw createError.NotFound("The email or password is incorrect");
      let role = user.roles;
      let roles = [];
      for (let i = 0; i < role.length; i++) {
        roles.push(role[i]);
      }
      if (!roles.includes("USER", "ADMIN"))
        throw { status: 404, message: "You're not admin !!!" };
      const token = tokenGenerator({ email, roles });
      const accessToken = "Bearer " + (await SignAccessToken(user._id));
      user.token = accessToken;
      user.save();
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          success: true,
          message: "Login successfully",
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOtp(req, res, next) {
    try {
      const { mobile } = req.body;
      const phone =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      /**
       *Valid formats:
        (123) 456-7890
        (123)456-7890
        123-456-7890
        123.456.7890
        1234567890
        +31636363634
        075-63546725
       */
      if (!phone.test(mobile))
        throw createError.Unauthorized("The code or mobile number is wrong");
      const code = RandomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result)
        throw createError.Unauthorized("The code or mobile number is wrong");
      let Kavenegar = require("kavenegar");
      let api = Kavenegar.KavenegarApi({
        apikey:
          "535A62424930595945492B326A686C534D537749394F534D376C714C4F706C51657972385752486F36546B3D",
      });
      api.VerifyLookup(
        {
          receptor: mobile,
          token: code,
          template: "verify",
        },
        function (response, status) {
          if (status == 200) {
            return res.status(HttpStatus.OK).json({
              data: {
                statusCode: HttpStatus.OK,
                success: true,
                message: "Code sent successfully",
              },
            });
          } else
            return res.status(HttpStatus.BAD_REQUEST).json({
              data: {
                statusCode: HttpStatus.BAD_REQUEST,
                success: false,
                message: "Please check your internet connection",
              },
            });
        }
      );
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      const { mobile, code } = req.body;
      console.log(mobile);
      console.log(code);
      const phone =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      /**
       *Valid formats:
        (123) 456-7890
        (123)456-7890
        123-456-7890
        123.456.7890
        1234567890
        +31636363634
        075-63546725
       */
      if (!phone.test(mobile))
        throw createError.Unauthorized("The code or mobile number is wrong");
      let regexCode = /^[0-9]{4}$/;
      if (!regexCode.test(code))
        throw createError.Unauthorized("The code or mobile number is wrong");
      const user = await UserModel.findOne({ mobile });
      if (!user)
        throw createError.NotFound("The code or mobile number is wrong");
      if (user.otp.code != code)
        throw createError.Unauthorized("The code or mobile number is wrong");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("The code or mobile number is wrong");
      const accessToken = "Bearer " + (await SignAccessToken(user._id));
      const newRefreshToken = "Bearer " + (await SignRefreshToken(user._id));
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          success: true,
          message: "Token sent successfully",
          accessToken,
          newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 60 * 1000 * 20, // secend * milisecend * min
    };
    const result = await this.checkExistUser(mobile);
    if (!result)
      throw createError.Unauthorized("The code or mobile number is wrong");
    return await this.updateUser(mobile, { otp });
  }
  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
  async getEmailOtp(req, res, next) {
    try {
      const code = RandomNumberGenerator();
      const { email } = req.body;
      const result = await this.saveUserEmail(email, code);
      if (!result) throw createError.InternalServerError("Please try again");
      let mailOptions = {
        from: process.env.EMAILUSER,
        to: email,
        subject: "FxTrader account security code",
        html: `<h1>Security code</h1><p>Please use the following security code for the FxTrader account da**5@outlook.com.</p><p>Security code : ${code}</p>`,
      };
      let transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASS,
        },
      });
      let sends = await transporter.sendMail(mailOptions);
      return res.status(200).send({
        data: {
          statuseCode: 200,
          message: "Code Send",
          code,
          email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async sendEmailOtp(req, res, next) {
    try {
      const code = RandomNumberGenerator();
      const { email } = req.body;
      console.log(code, email);
      const result = await this.saveUserEmail(email, code);
      console.log(result);
      if (!result) throw createError.Unauthorized("can not verify");
      let mailOptions = {
        from: process.env.EMAILSUPPORT,
        to: email,
        subject: "FxTrader account security code",
        html: `<h1>Security code</h1><p>Please use the following security code for the FxTrader account ${email}.</p><p>Security code : ${code}</p>`,
      };
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAILSUPPORT,
          pass: process.env.EMAILSUPPORTPASS,
        },
      });
      let sends = await transporter.sendMail(mailOptions);
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          success: true,
          message: "Code sent successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async mehdisendEmailOtp(req, res, next) {
    const code = RandomNumberGenerator();
    try {
      const { userData } = req.body;
      // const expiresIn = new Date().getTime() + 60 * 1000 * 20; // secend * milisecend * min
      const expiresIn = new Date().getTime() + 60 * 1000 * 1;
      const email = userData.email;
      let send = false;
      let result = await CodeModel.findOne({ email });
      if (!result) {
        const codeAdd = await CodeModel.create({ email, expiresIn, code });
        if (!codeAdd)
          throw createError.InternalServerError("لطفا مجددا تلاش کنید!");
        send = true;
      } else {
        const codeUpdate = await CodeModel.updateOne(
          { email },
          { $set: { code, expiresIn } }
        );
        if (codeUpdate.modifiedCount <= 0)
          throw createError.InternalServerError("لطفا مجددا تلاش کنید!");
        send = true;
      }
      if (send) {
        let mailOptions = {
          from: process.env.EMAILSUPPORT,
          to: email,
          subject: "FxTrader account security code",
          html: `<h1>Security code</h1><p>Please use the following security code for the FxTrader account ${email}.</p><p>Security code : ${code}</p>`,
        };
        let transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAILSUPPORT,
            pass: process.env.EMAILSUPPORTPASS,
          },
        });
        // let sends = await transporter.sendMail(mailOptions);
        console.log(code);
        return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.CREATED,
          success: true,
          message: "کد با موفقیت برای شما ارسال شد",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async testEmail(req, res, next) {
    const code = RandomNumberGenerator();
    try {
      let mailOptions = {
        from: process.env.EMAILSUPPORT,
        to: "pirzadehmahdi1222@gmail.com",
        subject: "FxTrader account security code",
        html: { path: "/build/index.html" },
        // html: `<div style=display:flex;flex-direction:column;color:#fff;background-image:linear-gradient(#223f36,#1c3531,#192a2b,#172122,#141718);padding:1rem 0.5rem 1rem 1rem>
        //   <img style=width:100px;height:100px src=https://fxtrader.cm/static/media/logo.b080d05e5b8dda352ed3.png alt=logo />
        //   <h1>Security code<h1>
        // </div>`,
      };
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAILSUPPORT,
          pass: process.env.EMAILSUPPORTPASS,
        },
      });

      await transporter.sendMail(mailOptions);
      return res.status(HttpStatus.CREATED).json({
        data: {
          statusCode: HttpStatus.CREATED,
          success: true,
          message: "Email sent successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async mehdicheckOtpEmail(req, res, next) {
    let regexCode = /^[0-9]{4}$/;
    try {
      const { email, code } = req.body;
      if (!regexCode.test(code))
        throw createError.Unauthorized("گذرواژه وارد شدده اشتباه می باشد!");

      const validate = await CodeModel.findOne({ email });

      if (!validate)
        throw createError.NotFound("گذرواژه وارد شدده اشتباه می باشد!");

      if (validate.code != code)
        throw createError.Unauthorized("گذرواژه وارد شدده اشتباه می باشد!");

      const now = Date.now();
      if (+validate.expiresIn < now)
        throw createError.Unauthorized("گذرواژه وارد شدده اشتباه می باشد!");

      this.mehdiDeleteOtpEmail(email);

      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          success: true,
          message: "احراز هویت با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async mehdiDeleteOtpEmail(email) {
    try {
      const result = await CodeModel.deleteOne({ email });
      if (!result)
        throw createError.InternalServerError("لطفا مجددا تلاش کنید!");
      return true;
    } catch (error) {
      next(error);
    }
  }
  async checkOtpEmail(req, res, next) {
    try {
      const { email, code } = req.body;
      let regexCode = /^[0-9]{4}$/;
      if (!regexCode.test(code))
        throw createError.Unauthorized("enter code corectly");
      const user = await UserModel.findOne({ email });
      if (!user) throw createError.NotFound("User Not Found");
      if (user.otp.code != code)
        throw createError.Unauthorized("The code is not correct");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("Your code has expired");
      const accessToken = "Bearer " + (await SignAccessToken(user._id));
      //const newRefreshToken = await SignRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
        },
      });
    } catch (error) {
      console.log("--------");
      next(error);
    }
  }
  async saveUserEmail(email, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 60 * 1000 * 2,
    };
    const result = await this.checkExistUserEmail(email);
    if (!result) throw createError.Unauthorized("can not login ");
    return await this.updateUserEmail(email, { otp });
  }
  async checkExistUserEmail(email) {
    const user = await UserModel.findOne({ email });
    console.log(user, email);
    return !!user;
  }
  async updateUserEmail(email, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { email },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
  async changePassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) throw createError.NotFound("User not found");
      const hash_password = hashString(password);
      const result = await UserModel.updateOne(
        { email },
        { $set: { password: hash_password } }
      );
      if (result.modifiedCount > 0) {
        return res.status(HttpStatus.OK).json({
          data: {
            statusCode: HttpStatus.OK,
            success: true,
            message: "Your password changed successfully!",
          },
        });
      }
      throw createError.InternalServerError("Please try again");
    } catch (error) {
      next(error);
    }
  }
  async validateCode(req, res, next) {
    let regexCode = /^[0-9]{4}$/;
    try {
      const { email, code } = req.body;
      if (!regexCode.test(code))
        throw createError.Unauthorized("The code or email is wrong");
      const validate = await CodeModel.findOne({ email: email });
      if (!validate) throw createError.NotFound("The code or email is wrong");
      if (validate.code != code)
        throw createError.Unauthorized("The code or email is wrong");
      const now = Date.now();
      if (validate.expiresIn < now)
        throw createError.Unauthorized("The code or email is wrong");
      this.mehdiDeleteOtpEmail(email);
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          success: true,
          message: "Success",
        },
      });
    } catch (error) {
      next(error);
    }
  }
})();
