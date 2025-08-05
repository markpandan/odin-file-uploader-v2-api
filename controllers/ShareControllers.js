const { downloadFileInCloud } = require("../config/cloudinary");
const db = require("../prisma/shareQueries");

exports.shareFileGet = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await db.getFile(fileId);

    if (!file) {
      res.status(404).json({ message: "No file found" });
      return;
    } else if (!file.to_share) {
      res.status(401).json({ message: "File is private" });
      return;
    }

    res.json({ output: { file } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.shareFileDownload = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await db.getFile(fileId);

    if (!file) {
      res.status(404).json({ message: "No file found" });
      return;
    } else if (!file.to_share) {
      res.status(401).json({ message: "File is private" });
      return;
    }

    const url = await downloadFileInCloud(file.public_id);
    res.json({ output: { url } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
