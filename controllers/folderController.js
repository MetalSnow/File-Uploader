const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const getAllFolders = asyncHandler(async (req, res) => {
  const folders = await prisma.folder.findMany();
  res.render('folders', { folders: folders });
});

const createFolder = asyncHandler(async (req, res) => {
  await prisma.folder.create({
    data: {
      name: req.body.folderName,
      userId: 1,
    },
  });
  res.redirect('/folders');
});

module.exports = { createFolder, getAllFolders };
