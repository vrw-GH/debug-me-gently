const express = require("express");
//! const upload = require('utils/imageUploader')
const upload = require("./utils/imageUploader");
//! added path
const path = require("path");

//! const app = express;
const app = express();
//! const port = Math.floor(Math.random() * 65535);
const port = 5000;

//! app.use(express.static(path.join(__dirname, "/public/uploads")));
app.use(express.static(path.join(__dirname, "/public")));

app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  //! const { file, fileValidationError } = req;
  const { file, fileValidationError } = req;
  if (!file) {
    res.status(400).send("Please upload a file"); // 400 Bad Request
    // ! to abandon function without crashing
    return;
  }
  if (fileValidationError) {
    res.status(400).send(fileValidationError);
  }
  const newFile = `./public/${file.filename}`;
  // res.render({ pathToImage: `/uploads/${file.originalname}` });
  res.send(`file uploaded to ${newFile}`);
});

//! get single pic
app.get("/public/:profile_pic", (req, res) => {
  const getFile = req.params.profile_pic;
  // res.attachment(`./public/${getFile}`).send();
  res.sendFile(`./public/${getFile}`, { root: __dirname });
});

//! catchall?
// app.use("/*", (req, res) => {
app.get("/*", (req, res) => {
  return res.send(
    "Connected successfully to the server.\nValid endpoints are:- \nPOST (/upload-profile-pic form-data:<profile_pic> with valid image) \nGET (/<image_name>.<ext>)"
  );
});

//! app.listen(port, () => console.log(`Listening on port 3000...`));
app.listen(port, () => console.log(`Listening on port ${port}...`));
