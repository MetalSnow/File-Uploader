const asyncHandler = require('express-async-handler');

const getUploadPage = asyncHandler((req, res) => {
  res.render('fileUpload');
});

const createFile = asyncHandler((req, res) => {
  console.log(req.file);
  res.redirect('/file-upload');
});

module.exports = { getUploadPage, createFile };
