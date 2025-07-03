const { Router } = require('express');
const {
  createFolder,
  getAllFolders,
  updateFolder,
} = require('../controllers/folderController');

const folderRouter = new Router();

folderRouter.get('/folders', getAllFolders);
folderRouter.post('/folders', createFolder);
folderRouter.patch('/folders/:id', updateFolder);

module.exports = folderRouter;
