const {param} = require("express-validator");

function mongoIdValidator(){
    return [
        param("id").isMongoId().withMessage("id مورد نظر اشتباه می باشد!") 
    ]
}
module.exports = {
    mongoIdValidator
}