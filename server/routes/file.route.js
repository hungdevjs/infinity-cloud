const express = require("express")

const router = express.Router()

const controller = require("../controllers/file.controller")

router.get("/fileAndFolder", controller.getFileAndFolder)

module.exports = router
