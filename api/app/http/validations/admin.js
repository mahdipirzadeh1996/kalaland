const { body } = require("express-validator");

function createNotifValidator(){
    return[
    body("date").notEmpty().withMessage("plz inter date"),
    body("type").notEmpty().withMessage("plz inter type"),
    body("title").notEmpty().withMessage("plz inter title"),
    body("descri").notEmpty().withMessage("plz inter descri"),
    body('userID').isMongoId().withMessage('Plz add a user')
]
}
function createTicketValidator(){
    return[
        body("email").isEmail().withMessage("enter email corectly") ,
        body("topic").notEmpty().withMessage("plz inter topic"),
        body("department").notEmpty().withMessage("plz inter department"),
        body("releventRobot").notEmpty().withMessage("plz inter releventRobot"),
        body("importTick").notEmpty().withMessage("enter email importTick") ,
        body("text").notEmpty().withMessage("plz inter text")
]
}
function createKycValidator(){
    return[
    body("name").notEmpty().withMessage("plz inter name"),
    ]
}
function createNotifValidator(){
    return[
    body("title").notEmpty().withMessage("plz inter title"),
    body("description").notEmpty().withMessage("plz inter description"),
]
}
module.exports ={
    createNotifValidator,
    createTicketValidator,
    createKycValidator
}