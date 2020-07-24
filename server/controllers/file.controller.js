const { errorFormat, successFormat } = require("../utils/format")

const File = require("../models/file.model")

module.exports.getFileAndFolder = async (req, res) => {
    try {
        const { _id } = req.user

        const files = await File.find({ isDeleted: false, userId: _id })

        res.json(successFormat({ data: files }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}