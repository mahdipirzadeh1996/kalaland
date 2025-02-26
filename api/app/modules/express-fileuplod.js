const path = require("path");
const { createUploadPath } = require("./function");
const uploadfile = async (req,res,next) =>{
    try {      
        if(req.file || Object.keys(req.files).length == 0) throw {status : 400, message : "plz chose a pic"}
        let image = req.files.image;
        const types =path.extname(image.name);
        if(![".png",".jpg",".jpeg"].includes(types.toLowerCase())) throw {status : 400, message : "incorect format"}
        const image_path= path.join(createUploadPath(),(Date.now()+types))
        req.body.image = image_path.substring(7) ;
        let uploadPath = path.join(__dirname,"..","..",image_path);
        console.log(uploadPath);
        image.mv(uploadPath,(err) =>{
        if(err) throw {status : 500, message : "can not save"}
        next();
    })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    uploadfile
}