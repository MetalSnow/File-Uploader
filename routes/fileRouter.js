const { Router } = require('express');
const multer = require('multer');
const { createFile, getUploadPage } = require('../controllers/fileController');

const fileRouter = new Router();

const upload = multer({ dest: 'uploads/' });

fileRouter.get('/file-upload', getUploadPage);

fileRouter.post('/upload', upload.single('uploaded-file'), createFile);

module.exports = fileRouter;
