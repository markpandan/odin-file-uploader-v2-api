const express = require("express");
const { isAuth } = require("../lib/authUtils");

const router = express.Router();
const controller = require("../controllers/CloudControllers");

// === Folders ===

router.get("/folders/", isAuth, controller.cloudGet);

router.get("/folders/:folderId", isAuth, controller.cloudGet);

router.post("/folders/new", isAuth, controller.cloudNewFolder);

router.put("/folders/:folderId/rename", isAuth, controller.cloudRenameFolder);

router.delete(
  "/folders/:folderId/delete",
  isAuth,
  controller.cloudDeleteFolder
);

// === Files ====

router.get("/files/:fileId/download", isAuth, controller.cloudDownloadFile);

router.post("/files/new", isAuth, controller.cloudNewFile);

router.put("/files/:fileId/rename", isAuth, controller.cloudRenameFile);

router.put("/files/:fileId/share", isAuth, controller.cloudShareFile);

router.delete("/files/:fileId/delete", isAuth, controller.cloudDeleteFile);

module.exports = router;
