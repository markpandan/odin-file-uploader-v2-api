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

exports.getFolders = async (ownerId, parentId) => {
  return await prisma.folders.findMany({
    where: {
      ownerId,
      parentId: parentId || null,
    },
  });
};

exports.getDirectories = async (folderId) => {
  return await prisma.$queryRawTyped(recursiveDirectory(folderId));
};

exports.createNewFile = async (ownerId, parentId, uploadedFile) => {
  const basename = path.parse(uploadedFile.filename).name;
  const filePath = removeTmpInPath(uploadedFile.path);
  await prisma.files.create({
    data: {
      id: basename,
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      directory: filePath,
      parentId: parentId || null,
      ownerId,
    },
  });
};

exports.createNewFolder = async (name, ownerId, parentId) => {
  await prisma.folders.create({
    data: {
      name,
      parentId: parentId || null,
      ownerId,
    },
  });
};

exports.renameFile = async () => {};

exports.renameFolder = async () => {};

exports.deleteFile = async () => {};

exports.deleteFolder = async () => {};
