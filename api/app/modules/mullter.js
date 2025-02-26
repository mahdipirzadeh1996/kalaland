const multer = require("multer");
const { createUploadPath } = require("./function");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, createUploadPath())
    },
    filename: (req, file, cd) => {
        const type = path.extname(file?.originalname || "");
        cd(null, Date.now() + type)

    }

});
const upload_multer = multer({ storage });
module.exports = {
    upload_multer
}