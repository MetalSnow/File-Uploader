const { Router } = require('express');
const multer = require('multer');
const { createFile, getFilesPage } = require('../controllers/fileController');
const { isAuth } = require('../middleware/authMiddlware');

const fileRouter = new Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileRouter.get('/file-upload/:id', isAuth, getFilesPage);

fileRouter.post('/upload/:id', upload.single('uploaded-file'), createFile);

module.exports = fileRouter;
