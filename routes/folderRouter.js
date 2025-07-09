const { Router } = require('express');
const {
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolder,
  getSharingPage,
  generateLink,
  getSharedFolder,
} = require('../controllers/folderController');
const { isAuth } = require('../middleware/authMiddlware');

const folderRouter = new Router();

folderRouter.get('/folders', isAuth, getAllFolders);
folderRouter.post('/folders', isAuth, createFolder);
folderRouter.patch('/folders/:id', isAuth, updateFolder);
folderRouter.delete('/folders/:id', isAuth, deleteFolder);

// share folder routes
folderRouter.get('/share/:id', isAuth, getSharingPage);
folderRouter.post('/share/:id', isAuth, generateLink);
folderRouter.get('/share/:id/:uuid', getSharedFolder);

module.exports = folderRouter;
