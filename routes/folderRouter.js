const { Router } = require('express');
const {
  getfoldersPage,
  createFolder,
} = require('../controllers/folderController');

const folderRouter = new Router();

folderRouter.get('/folders', getfoldersPage);

folderRouter.post('/folders', createFolder);

module.exports = folderRouter;
