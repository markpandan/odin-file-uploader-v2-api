const { uploadToCloud } = require("../config/cloudinary");
const { singleFileUpload } = require("../config/mutler");
const { isAuth } = require("../lib/authUtils");
const db = require("../prisma/cloudQueries");

exports.cloudGet = async (req, res) => {
  const { id: userId } = req.user;
  const { folderId } = req.params;

  const files = await db.getFiles(userId, folderId);
  const folders = await db.getFolders(userId, folderId);
  const directories = await db.getDirectories(folderId);

  res.json({ output: { files, folders, directories } });
};

exports.cloudNewFolder = async (req, res) => {
  const { id: userId } = req.user;
  const { name, parentId } = req.body;

  await db.createNewFolder(name, userId, parentId);

  res.json({ message: "Folder Created" });
};

exports.cloudRenameFolder = async (req, res) => {};

exports.cloudDeleteFolder = async (req, res) => {};

exports.cloudNewFile = [
  singleFileUpload("uploadFile"),
  async (req, res) => {
    const { id: userId } = req.user;
    const { parentId } = req.body.parentId;

    try {
      await db.createNewFile(userId, parentId, req.file);
      await uploadToCloud(req.file.path, req.file.destination);

      res.json({ message: "File Uploaded" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.cloudRenameFile = async (req, res) => {};

exports.cloudDeleteFile = async (req, res) => {};
