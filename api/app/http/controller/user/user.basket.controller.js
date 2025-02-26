const createError = require("http-errors");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const { PackageModel } = require("../../../models/products");
const { UserModel } = require("../../../models/users");
const { copyObject } = require("../../../utils/function");
const {
  addToBascketSchema,
} = require("../../validations/users/basket.validator");
const Controller = require("../controller");
class UserBasketController extends Controller {
  async createBasket(req, res, next) {
    try {
      const { productID } = req.body;
      const product = await this.findProductInBasket(req.user._id, productID);
      let result;
      if (product) {
        result = await UserModel.updateOne(
          {
            _id: req.user._id,
            "basket.package.productID": productID,
            "basket.package._id": product._id,
          },
          {
            $inc: {
              "basket.package.$.count": 1,
            },
          }
        );
      } else {
        result = await UserModel.updateOne(
          {
            _id: req.user._id,
          },
          {
            $push: {
              "basket.package": {
                productID,
                count: 1,
              },
            },
          }
        );
      }
      if (result.modifiedCount == 0)
        throw createError.InternalServerError("Can not add Plan");
      return res.status(HttpSatatus.CREATED).json({
        data: {
          statusCode: HttpSatatus.CREATED,
          success: true,
          message: "The product has been added to the shopping cart",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async addToBasket(req, res, next) {
    try {
      const basketBody = await addToBascketSchema.validateAsync(req.body.data);
      const { productID, count } = basketBody;
      const result = await PackageModel.findById({ _id: productID });
      if (!result)
        throw createError.NotFound("The desired Package was not found");
      const product = await this.findProductInBasket(req.user._id, productID);
      let updateResult;
      if (product) {
        console.log(productID, count);
        updateResult = await UserModel.updateOne(
          {
            _id: req.user._id,
            "basket.package.productID": productID,
            "basket.package._id": product._id,
          },
          {
            $inc: {
              "basket.package.$.count": Number(count),
            },
          }
        );
      } else {
        console.log("inja", productID, count);
        updateResult = await UserModel.updateOne(
          {
            _id: req.user._id,
          },
          {
            $push: {
              "basket.package": {
                productID,
                count: count,
              },
            },
          }
        );
      }
      if (updateResult.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "The product has been added to the shopping cart",
          },
        });
      }
      throw createError.InternalServerError("Can not add Plan");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async decrementFromBasket(req, res, next) {
    try {
      const { productID } = req.body;
      const product = await this.findProductInBasket(req.user._id, productID);
      if (!product)
        throw createError.NotFound(
          "The desired product was not found in the shopping cart"
        );
      let message;
      let updateResult;
      if (product.count > 1) {
        updateResult = await UserModel.updateOne(
          {
            _id: req.user._id,
            "basket.package.productID": productID,
            "basket.package._id": product._id,
          },
          {
            $inc: {
              "basket.package.$.count": -1,
            },
          }
        );
        message = "One product was missing from the shopping cart";
      } else {
        updateResult = await UserModel.updateOne(
          {
            _id: req.user._id,
            "basket.package.productID": productID,
            "basket.package._id": product._id,
          },
          {
            $pull: {
              "basket.package": {
                productID,
              },
            },
          }
        );
        message = "The product was removed from the shopping cart";
      }
      if (updateResult.modifiedCount > 0) {
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message,
          },
        });
      }
      throw createError.InternalServerError("Can not add Plan");
    } catch (error) {
      next(error);
    }
  }
  async removeFromBasket(req, res, next) {
    try {
      const { productID } = req.body;
      // console.log(productID);
      const result = await PackageModel.findById({ _id: productID });
      if (!result)
        throw createError.NotFound("The desired Package was not found");
      const product = await this.findProductInBasket(req.user._id, productID);
      let updateResult;
      if (!product)
        throw createError.NotFound(
          "The desired product was not found in the shopping cart"
        );
      updateResult = await UserModel.updateOne(
        {
          _id: req.user._id,
          "basket.package.productID": productID,
          "basket.package._id": product._id,
        },
        {
          $pull: {
            "basket.package": {
              productID,
            },
          },
        }
      );
      if (updateResult.modifiedCount > 0) {
        const user = req.user._id;
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
                        (item) =>
                          item.productID.valueOf() == product._id.valueOf()
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
                        (item) =>
                          item.productID.valueOf() == product._id.valueOf()
                      ).count;
                      const totalPrice = count * product.price;
                      return (
                        total +
                        (totalPrice - (product.discount / 100) * totalPrice)
                      );
                    },
                    0);
                    const productIds = productDetail.map((prduct) =>
                      prduct._id.valueOf()
                    );
                    const fee = productAmount * 0.005;
                    const totalProductAmount =
                      Number(productAmount) + Number(fee);
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
        //if (result[0]) throw createError.NotFound("Can not found User Cart");
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "User shoping Cart sent successfully",
            result: result[0],
          },
        });
      }
      throw createError.InternalServerError("Can not add Plan");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async findProductInBasket(userID, productID) {
    const basketProduct = await UserModel.findOne(
      { _id: userID, "basket.package.productID": productID },
      { "basket.package.$": 1 }
    );
    const product = copyObject(basketProduct);
    return product?.basket?.package?.[0];
  }
  async getUserBasket(req, res, next) {
    try {
      const user = req.user._id;
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
                      (item) =>
                        item.productID.valueOf() == product._id.valueOf()
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
                      (item) =>
                        item.productID.valueOf() == product._id.valueOf()
                    ).count;
                    const totalPrice = count * product.price;
                    return (
                      total +
                      (totalPrice - (product.discount / 100) * totalPrice)
                    );
                  },
                  0);
                  const productIds = productDetail.map((prduct) =>
                    prduct._id.valueOf()
                  );
                  const fee = productAmount * 0.005;
                  const totalProductAmount =
                    Number(productAmount) + Number(fee);
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
      //if (result[0]) throw createError.NotFound("Can not found User Cart");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "User shoping Cart sent successfully",
          result: result[0],
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async passDate() {}
}
module.exports = {
  UserBasketController: new UserBasketController(),
};
