const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: 'You are not authorized to view this resource.' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: 'You are not authorized to view this resource.' });
  }
};

module.exports = { isAuth, isAdmin };
