const express = require("express")

const router = express.Router()
var multer = require("multer")
var storage = multer.diskStorage(
    {
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }
)

var upload = multer({ storage: storage })

const controller = require("../controllers/file.controller")

router.get("/fileAndFolder", controller.getFileAndFolder)

router.get("/:_id", controller.getFileInfo)

router.post("/upload", upload.array("files", 5), controller.uploadFile)

module.exports = router
