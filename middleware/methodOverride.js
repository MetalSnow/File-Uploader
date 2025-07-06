const methodOverride = (req, res, next) => {
  if (req.method === 'POST' && req.body?._method) {
    const method = req.body._method;

    req.method = method.toUpperCase();
  }

  next();
};

module.exports = methodOverride;
