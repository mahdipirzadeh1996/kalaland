const {UserBasketController} = require("../../http/controller/user/user.basket.controller");
const { verifyAccessToken } = require("../../http/middlewares/autoLogin");
const { expressValidatiorMaper } = require("../../http/middlewares/chekErrors");
const { mongoIdValidator } = require("../../http/validations/public");
const router =require("express").Router();
//          ----------------BASKET------------------
router.post("/add-basket",verifyAccessToken,UserBasketController.addToBasket);
router.post("/remove-basket",verifyAccessToken,UserBasketController.removeFromBasket);
router.post("/create-basket",verifyAccessToken,UserBasketController.createBasket);
router.post("/decrement-basket",verifyAccessToken,UserBasketController.decrementFromBasket);
router.get("/basket-list",verifyAccessToken,UserBasketController.getUserBasket);

module.exports={
    UserBasketRoutes : router
}