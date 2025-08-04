const { uploadToCloud, destroyFileInCloud } = require("../config/cloudinary");
const { singleFileUpload } = require("../config/mutler");
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

exports.cloudRenameFolder = async (req, res) => {
  const { id: userId } = req.user;
  const { folderId } = req.params;
  const { name } = req.body;

  try {
    await db.renameFolder(folderId, userId, name);
    res.json({ message: "Folder Renamed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cloudDeleteFolder = async (req, res) => {
  const { id: userId } = req.user;
  const { folderId } = req.params;

  try {
    await db.deleteFolder(folderId, userId);
    res.json({ message: "Folder Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cloudNewFile = [
  singleFileUpload("uploadFile"),
  async (req, res) => {
    const { id: userId } = req.user;
    const { parentId } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "Invalid File Submitted" });
      return;
    }

    try {
      const uploadedFile = await uploadToCloud(
        req.file.path,
        req.file.destination
      );

      await db.createNewFile(userId, parentId, req.file, {
        resource_type: uploadedFile.resource_type,
        format: uploadedFile.format,
        public_id: uploadedFile.public_id,
      });

      res.json({ message: "File Uploaded" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
];

exports.cloudRenameFile = async (req, res) => {
  const { id: userId } = req.user;
  const { fileId } = req.params;
  const { name } = req.body;

  try {
    await db.renameFile(fileId, userId, name);
    res.json({ message: "File Renamed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.cloudDeleteFile = async (req, res) => {
  const { id: userId } = req.user;
  const { fileId } = req.params;
  const { public_id, resource_type } = req.body;

  try {
    await destroyFileInCloud(public_id, resource_type);
    await db.deleteFile(fileId, userId);

    res.json({ message: "File Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
