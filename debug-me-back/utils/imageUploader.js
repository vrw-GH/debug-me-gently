const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  //! destination: (req, file, cb) => {
  //   cb(null, "./public/uploads");
  // },
  destination: "./public",
  filename: (req, file, cb) => {
    //! cb(file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//! const limits = { fileSize: 1000 };
const limits = { fileSize: 100000 };

//! const fileFilter = (req, file, cb) {
const fileFilter = (req, file, cb) => {
  // Accept image file types only
  console.log(file);
  //! if (!file.fieldname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
