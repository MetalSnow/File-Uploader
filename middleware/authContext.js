module.exports = (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.flashError = req.flash('error');
  next();
};
