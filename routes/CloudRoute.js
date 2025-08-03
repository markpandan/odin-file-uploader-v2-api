const express = require("express");
const router = express.Router();

const controller = require("../controllers/CloudControllers");

//  Folders

router.get("/folders/", controller.cloudGet);

router.get("/folders/:folderId", controller.cloudGet);

router.post("/folders/new", controller.cloudNewFolder);

router.put("/folders/:folderId/rename", controller.cloudRenameFolder);

router.delete("/folders/:folderId/delete", controller.cloudDeleteFolder);

// Files

router.post("/files/new", controller.cloudNewFile);

router.put("/files/:fileId/rename", controller.cloudRenameFile);

router.delete("/files/:fileId/delete", controller.cloudDeleteFile);

module.exports = router;
