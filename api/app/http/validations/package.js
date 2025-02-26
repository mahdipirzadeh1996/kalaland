const { body } = require("express-validator");

function createPackageValidator(){
    return[
    body("name").notEmpty().withMessage("plz inter name"),
    body("type").notEmpty().withMessage("plz inter type"),
    body("expreDate").notEmpty().withMessage("plz inter expreDate"),
    body("price").notEmpty().withMessage("plz inter price"),
    body("investoryLimit").notEmpty().withMessage("plz inter investoryLimit"),
    body("image").notEmpty().withMessage("plz inter image")
    
]
}
module.exports ={
    createPackageValidator
}