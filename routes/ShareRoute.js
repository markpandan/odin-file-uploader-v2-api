const express = require("express");

const router = express.Router();
const controller = require("../controllers/ShareControllers");

router.get("/:fileId", controller.shareFileGet);

router.get("/:fileId/download", controller.shareFileDownload);

module.exports = router;
