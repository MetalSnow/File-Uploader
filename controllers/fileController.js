const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const getUploadPage = asyncHandler((req, res) => {
  res.render('fileUpload', { id: req.params.id });
});

const createFile = asyncHandler(async (req, res) => {
  console.log(req.file);
  console.log(req.params.id);
  await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      folderId: Number(req.params.id),
    },
  });
  res.redirect(`/file-upload/${req.params.id}`);
});

module.exports = { getUploadPage, createFile };
