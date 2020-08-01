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

        const allFiles = await File.find({ isDeleted, userId: _id })

        const files = allFiles.filter(item => !item.folderId).sort((file1, file2) => file1.name.toLowerCase() < file2.name.toLowerCase() ? -1 : 1)

        const user = await User.findOne({ isDeleted: false, _id }).select("folders")

        const folders = user.folders.filter(item => item.isDeleted === isDeleted).sort((folder1, folder2) => folder1.name.toLowerCase() < folder2.name.toLowerCase() ? -1 : 1)

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

    try {
        const { _id } = req.user

        const user = await User.findOne({ _id }).select("folders")
        if (!user) {
            throw new Error("User doesn't exist")
        }

        const { folderId, folderName } = req.query
        let newFolderId = null
        if (folderName && folderName.trim()) {
            const oldFolder = user.folders.find(item => item.name.trim() === folderName.trim())
            if (!oldFolder) {
                user.folders = [...user.folders, { name: folderName.trim(), isDeleted: false }]
                await user.save()
                newFolderId = user.folders.find(item => item.name === folderName)
            } else {
                newFolderId = oldFolder._id
            }
        }

        for (const file of req.files) {
            const formData = new FormData()
            formData.append("file", fs.createReadStream(file.path))

            const res = await sendFile(formData)

            // save file data to db here
            const newFile = new File({
                name: file.originalname,
                type: file.mimetype,
                fileId: res.data.fileId,
                userId: _id,
                isDeleted: false
            })

            if (newFolderId || folderId) {
                newFile.folderId = newFolderId || folderId
            }

            await newFile.save()
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