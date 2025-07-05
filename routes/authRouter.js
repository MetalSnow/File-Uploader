const { Router } = require('express');
const {
  signupUser,
  getSignUpPage,
  getLoginPage,
  logoutUser,
} = require('../controllers/authController');
const passport = require('../config/passport');

const authRouter = new Router();

authRouter.get('/sign-up', getSignUpPage);
authRouter.post('/sign-up', signupUser);
authRouter.get('/log-in', getLoginPage);

authRouter.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true,
  })
);

authRouter.get('/log-out', logoutUser);

module.exports = authRouter;
