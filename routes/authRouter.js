const { Router } = require('express');
const { signupUser, getSignUpPage } = require('../controllers/authController');

const authRouter = new Router();

authRouter.get('/sign-up', getSignUpPage);
authRouter.post('/sign-up', signupUser);

module.exports = authRouter;
