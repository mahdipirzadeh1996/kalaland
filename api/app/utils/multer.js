const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");
function createRoute(req) {
  const date = new Date();
  const Year = date.getFullYear().toString();
  const Month = (date.getMonth() + 1).toString();
  const Day = date.getDate().toString();
  req.body.fileUploadPath = path.join("uploads", "blogs", Year, Month, Day);
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
function createRoutePackage(req) {
  const date = new Date();
  const Year = date.getFullYear().toString();
  const Month = (date.getMonth() + 1).toString();
  const Day = date.getDate().toString();
  req.body.fileUploadPath = path.join("uploads", "package", Year, Month, Day);
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "package",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
function createRouteTicket(req) {
  const date = new Date();
  const Year = date.getFullYear().toString();
  const Month = (date.getMonth() + 1).toString();
  const Day = date.getDate().toString();
  req.body.fileUploadPath = path.join("uploads", "ticket", Year, Month, Day);
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "ticket",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      if (file.fieldname == "ticket") {
        const filePath = createRouteTicket(req);
        return cb(null, filePath);
      } else if (file.fieldname == "package") {
        const filePath = createRoutePackage(req);
        return cb(null, filePath);
      } else {
        const filePath = createRoute(req);
        return cb(null, filePath);
      }
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      console.log(file.originalname);
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});
const maxSize = 1 * 1000 * 1000;
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  //.PNG|\.JPG|\.WEBP|\.JPEG|\.GIF
  const mimetype = [
    ".png",
    ".jpg",
    ".webp",
    ".jpeg",
    ".gif",
    ".PNG",
    ".JPG",
    ".WEBP",
    ".JPEG",
    ".GIF",
  ];
  if (mimetype.includes(ext)) {
    return cb(null, true);
  }
  return cb(createHttpError.BadRequest("Image Format incorecte"));
}
const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter,
});
module.exports = {
  uploadFile,
};
