const path = require("path");
const fs = require("fs");
const { UserModel } = require("../models/users");
const moment = require("moment-jalaali");
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')
function RandomNumberGenerator() {
  return Math.floor(Math.random() * 9000 + 1000);
}
function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}
function deleteFileInPublic(fileAddress) {
  const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
  if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
}
async function getUserBasket(user) {
  const result = await UserModel.aggregate([
    {
      $match: {
        _id: user,
      },
    },
    {
      $project: {
        basket: 1,
      },
    },
    {
      $lookup: {
        from: "packages",
        localField: "basket.package.productID",
        foreignField: "_id",
        as: "productDetail",
      },
    },
    {
      $addFields: {
        productDetail: {
          $function: {
            body: function (productDetail, products) {
              return productDetail.map(function (product) {
                const count = products.find(
                  (item) => item.productID.valueOf() == product._id.valueOf()
                ).count;
                const totalPrice = count * product.price;
                return {
                  ...product,
                  basketCount: count,
                  totalPrice,
                  finalPrice:
                    totalPrice - (product.discount / 100) * totalPrice,
                };
              });
            },
            args: ["$productDetail", "$basket.package"],
            lang: "js",
          },
        },
        payDetail: {
          $function: {
            body: function (productDetail, products) {
              const productAmount = productDetail.reduce(function (
                total,
                product
              ) {
                const count = products.find(
                  (item) => item.productID.valueOf() == product._id.valueOf()
                ).count;
                const totalPrice = count * product.price;
                return (
                  total + (totalPrice - (product.discount / 100) * totalPrice)
                );
              },
              0);
              const productIds = productDetail.map((prduct) =>
                prduct._id.valueOf()
              );
              const fee = productAmount * 0.005;
              const totalProductAmount = Number(productAmount) + Number(fee);
              return {
                productAmount,
                fee,
                totalProductAmount,
                productIds,
              };
            },
            args: ["$productDetail", "$basket.package"],
            lang: "js",
          },
        },
      },
    },
    {
      $project: {
        productDetail: 1,
        payDetail: 1,
      },
    },
  ]);
  return result[0];
}
function invoiceNumberGenerator() {
  return (
    moment().format("YYYYMMDDHHmmssSSS") +
    String(process.hrtime()[1]).padStart(9, 0)
  );
}
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}
function listOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files.map((file) =>
      path.join(fileUploadPath, file.filename).replace(/[\\\\]/gm, "/")
    );
  }
  return [];
}
function generateResponse(res, statusCode, message) {
  return res.status(code).json({
    statusCode,
    message,
  });
}
 function googleAuthenticatorGenerator(){
  let secret = speakeasy.generateSecret({
    name:process.env.GOOGLE_AUTHENTICATOR_NAME,
  })
  return secret
  //console.log(secret);
  //save ascii hex base32 otpauth_url
  //const qrUser=await qrcode.toDataURL(secret.otpauth_url,{ type: "image/png" })
  //console.log(qrUser)
}
function googleAuthenticatorChecker(code,sec){
  let verfiy =speakeasy.totp.verify({
      secret:sec,
      encoding:process.env.GOOGLE_AUTHENTICATOR_ENCODING,
      token :code
  })
  return verfiy
  //console.log(verfiy);
}
async function qrProducer(data,option){
  const qr=await qrcode.toDataURL(data,option)
  return qr
}
module.exports = {
  RandomNumberGenerator,
  copyObject,
  deleteFileInPublic,
  getUserBasket,
  invoiceNumberGenerator,
  deleteInvalidPropertyInObject,
  listOfImagesFromRequest,
  generateResponse,
  googleAuthenticatorGenerator,
  googleAuthenticatorChecker,
  qrProducer
};
