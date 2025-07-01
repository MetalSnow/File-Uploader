const { Router } = require('express');
const {
  createFolder,
  getAllFolders,
} = require('../controllers/folderController');

const folderRouter = new Router();

folderRouter.get('/folders', getAllFolders);
folderRouter.post('/folders', createFolder);

module.exports = folderRouter;
