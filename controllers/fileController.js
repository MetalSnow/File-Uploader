const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('../generated/prisma');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const prisma = new PrismaClient();

const getFilesPage = asyncHandler(async (req, res) => {
  const folderId = Number(req.params.id);
  const files = await prisma.file.findMany({
    where: {
      folderId: folderId,
    },
  });
  res.render('fileUpload', { id: folderId, files: files });
});

const createFile = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const file = req.file;
  const filePath = `${req.user.id}/${file.originalname}`;

  const { data, error } = await supabase.storage
    .from('files')
    .upload(filePath, file.buffer);

  if (error) {
    console.error('Upload error:', error);
    return next(error);
  }

  const publicUrl = supabase.storage.from('files').getPublicUrl(filePath)
    .data.publicUrl;

  await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      url: publicUrl,
      folderId: Number(req.params.id),
    },
  });
  res.redirect(`/file-upload/${req.params.id}`);
});

const deleteFile = asyncHandler(async (req, res) => {
  await supabase.storage
    .from('files')
    .remove([`${req.user.id}/${req.body.fileName}`]);

  await prisma.file.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.redirect(`/file-upload/${req.body.folderId}`);
});

module.exports = { getFilesPage, createFile, deleteFile };
