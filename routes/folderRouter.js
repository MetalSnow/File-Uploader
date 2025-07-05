const { Router } = require('express');
const {
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolder,
} = require('../controllers/folderController');
const { isAuth } = require('../middleware/authMiddlware');

const folderRouter = new Router();

folderRouter.get('/folders', isAuth, getAllFolders);
folderRouter.post('/folders', createFolder);
folderRouter.patch('/folders/:id', updateFolder);
folderRouter.delete('/folders/:id', deleteFolder);

module.exports = folderRouter;
