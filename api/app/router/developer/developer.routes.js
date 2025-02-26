const router = require("express").Router();
const newsController = require("../../http/controller/admin/admin.news.controller");
const packageController = require("../../http/controller/admin/admin.package.controller");
router.get("/news-list", newsController.showAllNews);
router.get("/plan-list", packageController.getAllPackage);
module.exports = {
    DeveloperApiRouter: router
}