const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('../generated/prisma');
const { randomUUID } = require('node:crypto');

const prisma = new PrismaClient();

const getAllFolders = asyncHandler(async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
    },
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
      userId: req.user.id,
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

const deleteFolder = asyncHandler(async (req, res) => {
  await prisma.folder.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.redirect('/folders');
});

const getSharingPage = asyncHandler(async (req, res) => {
  res.render('share', { id: req.params.id });
});

const generateLink = asyncHandler(async (req, res) => {
  const uuid = randomUUID();
  await prisma.folder.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      expiresAt: new Date(req.body.expiration),
      linkId: uuid,
    },
  });
  res.render('share', { id: req.params.id, uuid: uuid });
});

const getSharedFolder = asyncHandler(async (req, res) => {
  const folderId = Number(req.params.id);
  const { expiresAt, linkId } = await prisma.folder.findFirst({
    where: {
      id: folderId,
    },
    select: {
      linkId: true,
      expiresAt: true,
    },
  });

  if (req.params.uuid !== linkId) {
    return res.status(400).json({ msg: 'ERROR 400 Bad Request' });
  }

  if (new Date(expiresAt) < new Date()) {
    return res.status(410).json({ msg: 'The link has expired' });
  }

  const folderData = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
    select: {
      name: true,
      file: {
        select: {
          name: true,
          size: true,
          uploadTime: true,
          url: true,
        },
      },
    },
  });

  res.render('sharedFolder', { folderData: folderData });
});

module.exports = {
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolder,
  getSharingPage,
  generateLink,
  getSharedFolder,
};
