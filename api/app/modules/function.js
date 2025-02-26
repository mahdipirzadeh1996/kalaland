const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}
function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3d" });
    return token
}
function tokenVerifyJWTToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result?.email) throw { status: 401, message: "plz login" }
    return result
}
function createUploadPath() {
    console.log('first')
    let d = new Date();
    const Year = "" + d.getFullYear();
    const Mounth = "" + d.getMonth();
    const Day = "" + d.getDate();
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", Year, Mounth, Day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "upload", Year, Mounth, Day);
}
function createLinckforFile(fileaddress, req) {

    return req.protocol + "://" + req.get("host") + "/" + (fileaddress.replace(/[\\\\]/gm, "/"))
}

module.exports = {
    hashString,
    tokenGenerator,
    tokenVerifyJWTToken,
    createUploadPath,
    createLinckforFile
}