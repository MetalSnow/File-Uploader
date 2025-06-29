const { Router } = require('express');
const { signupUser } = require('../controllers/authController');

const authRouter = new Router();

authRouter.post('/sign-up', signupUser);

module.exports = authRouter;
