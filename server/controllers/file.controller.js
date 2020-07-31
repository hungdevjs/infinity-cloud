const fs = require("fs")
const FormData = require("form-data");

const { getFileInfo, sendFile } = require("../utils/api")

const { errorFormat, successFormat } = require("../utils/format")

const File = require("../models/file.model")
const User = require("../models/user.model")

module.exports.getFileAndFolder = async (req, res) => {
    try {
        const { _id } = req.user

        const isDeleted = req.query.isDeleted === "true"

        const files = await File.find({ isDeleted, userId: _id, folderId: null })

        const user = await User.findOne({ isDeleted: false, _id }).select("folders")

        const folders = user.folders.filter(item => item.isDeleted === isDeleted)

        res.json(successFormat({ files, folders }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}

module.exports.getFileInfo = async (req, res) => {
    try {
        const { _id } = req.params

        const file = await File.findOne({ isDeleted: false, _id })
        if (!file) {
            throw new Error("File doesn't exist")
        }

        const { data } = await getFileInfo(file.fileId)

        res.json(successFormat(data))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}

module.exports.uploadFile = async (req, res) => {
    let data = null

    if (req.files.length === 0) {
        return res.json(errorFormat("No file to upload"))
    }

    const { _id } = req.user

    try {
        for (const file of req.files) {
            const formData = new FormData()
            formData.append("file", fs.createReadStream(file.path))

            sendFile(formData)
                .then(data => {
                    // save file data to db here
                })
                .catch(err => console.log(err.message))
        }

        data = successFormat({ data: "Your file will be available soon" })
    } catch (err) {
        data = errorFormat(err.message)
    }

    res.json(data)
}

module.exports.getAllFolders = async (req, res) => {
    try {
        const { _id } = req.user

        const user = await User.findOne({ _id }).select("folders")
        if (!user) {
            throw new Error("User doesn't exist")
        }

        const folders = user.folders.filter(item => !item.isDeleted)
        res.json(successFormat({ folders }))
    } catch (err) {
        console.log(err.message)
        res.json(errorFormat(err.message))
    }
}