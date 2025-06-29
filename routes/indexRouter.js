const { Router } = require('express');
const { getHomePage } = require('../controllers/indexController');

const indexRouter = new Router();

indexRouter.get('/', getHomePage);

module.exports = indexRouter;
