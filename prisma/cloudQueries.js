const { removeTmpInPath } = require("../lib/pathUtils");
const { recursiveDirectory } = require("@prisma/client/sql");
const prisma = require("./query");
const path = require("node:path");

exports.getFiles = async (ownerId, parentId) => {
  return await prisma.files.findMany({
    where: {
      ownerId,
      parentId: parentId || null,
    },
  });
};

exports.getOneFile = async (ownerId, fileId) => {
  return await prisma.files.findUnique({
    where: {
      id: fileId,
      ownerId,
    },
  });
};

exports.getFolders = async (ownerId, parentId) => {
  return await prisma.folders.findMany({
    where: {
      ownerId,
      parentId: parentId || null,
    },
  });
};

exports.getDirectories = async (folderId) => {
  const directories = await prisma.$queryRawTyped(recursiveDirectory(folderId));
  return directories.reverse();
};

exports.createNewFile = async (ownerId, parentId, uploadedFile, properties) => {
  const { resource_type, format, public_id } = properties;

  const { name: basename, ext } = path.parse(uploadedFile.filename);
  const filePath = removeTmpInPath(uploadedFile.path);
  return await prisma.files.create({
    data: {
      id: basename,
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      resource_type,
      format: format || ext.slice(1),
      public_id,
      directory: filePath,
      parentId: parentId || null,
      ownerId,
    },
  });
};

exports.createNewFolder = async (name, ownerId, parentId) => {
  return await prisma.folders.create({
    data: {
      name,
      parentId: parentId || null,
      ownerId,
    },
  });
};

exports.renameFile = async (fileId, userId, newName) => {
  return await prisma.files.update({
    where: {
      id: fileId,
      ownerId: userId,
    },
    data: {
      name: newName,
    },
  });
};

exports.renameFolder = async (folderId, userId, newName) => {
  return await prisma.folders.update({
    where: {
      id: folderId,
      ownerId: userId,
    },
    data: {
      name: newName,
    },
  });
};

exports.deleteFile = async (fileId, userId) => {
  return await prisma.files.delete({
    where: {
      id: fileId,
      ownerId: userId,
    },
  });
};

exports.deleteFolder = async (folderId, userId) => {
  return await prisma.folders.delete({
    where: {
      id: folderId,
      ownerId: userId,
    },
  });
};
