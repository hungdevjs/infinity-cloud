const { getFileInfo } = require("../utils/api")

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