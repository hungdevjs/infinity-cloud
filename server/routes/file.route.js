const express = require("express")

const router = express.Router()

const controller = require("../controllers/file.controller")

router.get("/fileAndFolder", controller.getFileAndFolder)

router.get("/:_id", controller.getFileInfo)

module.exports = router
