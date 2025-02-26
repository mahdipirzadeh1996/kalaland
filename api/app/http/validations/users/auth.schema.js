const Joi = require("joi");
const getOtpSchema =Joi.object({
    //const phone =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    mobile : Joi.string().trim().length(10).pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).error(new Error("شماره موبایل واردشده صحیح نمی باشد"))

    //  email : Joi.string().trim().lowercase().email().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
   // password : Joi.string().trim().min(6).max(16).required().error(new Error("رمز عبور باید بین 6 -16 کاراکتر باشد"))
})
const checkOtpSchema =Joi.object({
    code: Joi.string().max(6).min(4).required().error(new Error("The entered code is incorrect"))
})
module.exports ={
    getOtpSchema,
    checkOtpSchema
}