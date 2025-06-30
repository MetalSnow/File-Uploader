const asyncHandler = require('express-async-handler');

const getfoldersPage = asyncHandler((req, res) => {
  res.render('folders');
});

module.exports = { getfoldersPage };
