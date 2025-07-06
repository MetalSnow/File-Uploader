const { Router } = require('express');
const multer = require('multer');
const { createFile, getUploadPage } = require('../controllers/fileController');
const { isAuth } = require('../middleware/authMiddlware');

const fileRouter = new Router();

const upload = multer({ dest: 'uploads/' });

fileRouter.get('/file-upload/:id', isAuth, getUploadPage);

fileRouter.post('/upload/:id', upload.single('uploaded-file'), createFile);

module.exports = fileRouter;
