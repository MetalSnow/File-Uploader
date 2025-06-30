const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const getfoldersPage = asyncHandler((req, res) => {
  res.render('folders');
});

const createFolder = asyncHandler(async (req, res) => {
  await prisma.folder.create({
    data: {
      name: req.body.folderName,
      userId: req.user.id,
    },
  });
  res.redirect('/folders');
});

module.exports = { getfoldersPage, createFolder };
