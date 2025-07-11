const { PrismaClient } = require('../generated/prisma');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be minimum 3 characters.';

const validateUser = [
  body('username')
    .trim()
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 2 })
    .withMessage(`Username ${lengthErr}`),
  ,
  body('email')
    .trim()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (user) throw new Error('E-mail already in use.');
    })
    .isEmail()
    .withMessage('Please enter a valid email.'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be minimum 5 characters.'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Confirmed password does not match.'),
];

const getSignUpPage = asyncHandler((req, res) => {
  res.render('sign-up');
});
const getLoginPage = asyncHandler((req, res) => {
  res.render('log-in');
});

const signupUser = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up', {
        errors: errors.array(),
        userInfo: req.body,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.redirect('/log-in');
  }),
];

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = { signupUser, getSignUpPage, getLoginPage, logoutUser };
