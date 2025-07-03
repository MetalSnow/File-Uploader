const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const getAllFolders = asyncHandler(async (req, res) => {
  const folders = await prisma.folder.findMany({
    orderBy: {
      id: 'asc',
    },
  });
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

const updateFolder = asyncHandler(async (req, res) => {
  await prisma.folder.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name: req.body.newName,
    },
  });
  res.redirect('/folders');
});

module.exports = { createFolder, getAllFolders, updateFolder };
