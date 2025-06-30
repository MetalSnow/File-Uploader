const { Router } = require('express');
const { getfoldersPage } = require('../controllers/folderController');

const folderRouter = new Router();

folderRouter.get('/folders', getfoldersPage);

// folderRouter.post('/upload', upload.single('uploaded-file'), createFile);

module.exports = folderRouter;
