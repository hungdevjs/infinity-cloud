const fs = require("fs")
const moment = require("moment")
const FormData = require("form-data");

const { getFileInfo, sendFile } = require("../utils/api")

const { errorFormat, successFormat, dateTimeFormat } = require("../utils/format")
const moneyCalculating = require("../utils/moneyCalculating")

const File = require("../models/file.model")
const User = require("../models/user.model")

module.exports.getFileAndFolder = async (req, res) => {
    try {
        const { _id } = req.user

        console.log({ _id })

        const isDeleted = req.query.isDeleted === "true"
        const { year, month } = req.query

        const allFiles = await File.find({ userId: _id })

        const files = allFiles
            .filter(item => {
                const itemMonth = item.date.split("-")[1]
                const itemYear = item.date.split("-")[2].slice(0, 4)

                return !item.folderId && parseInt(itemMonth) === parseInt(month) && parseInt(itemYear) === parseInt(year)
            })
            .sort()
            .reverse()

        const minutes = files.reduce((total, file) => total + file.minutes, 0)
        const seconds = files.reduce((total, file) => total + file.seconds, 0)

        const totalMinutes = minutes + Math.floor(seconds / 60)
        const totalSeconds = seconds % 60

        const totalTime = `${totalMinutes} mins ${totalSeconds} seconds`
        const totalMoney = moneyCalculating(totalMinutes, totalSeconds)

        const user = await User.findOne({ isDeleted: false, _id }).select("folders").lean()

        const folders = user.folders.filter(item => item.isDeleted === isDeleted).sort((folder1, folder2) => folder1.name.toLowerCase() < folder2.name.toLowerCase() ? -1 : 1)

        for (const folder of folders) {
            const fileInFolders = allFiles.filter(item => item.folderId == folder._id)
            folder.files = fileInFolders
        }

        res.json(successFormat({ files, folders, totalTime, totalMoney }))
    } catch (err) {
        console.error(err)
        res.json(errorFormat(err.message))
    }
}

module.exports.getFileInfo = async (req, res) => {
    try {
        const { _id } = req.params
        const userId = req.user._id

        const file = await File.findOne({ isDeleted: false, _id, userId })
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

        const { folderId, folderName, minutes, seconds } = req.query
        let newFolderId = null
        if (folderName && folderName.trim()) {
            const oldFolder = user.folders.find(item => item.name.trim() === folderName.trim())
            if (!oldFolder) {
                user.folders = [...user.folders, { name: folderName.trim(), isDeleted: false }]
                await user.save()
                newFolderId = user.folders.find(item => item.name === folderName)._id
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
                minutes,
                seconds,
                date: moment().utcOffset(420).format(dateTimeFormat),
                money: moneyCalculating(minutes, seconds),
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
        res.json(errorFormat(err.message))
    }
}

module.exports.deleteFile = async (req, res) => {
    try {
        const userId = req.user._id
        const { _id } = req.params

        const file = await File.findOne({ isDeleted: false, _id, userId })
        if (!file) {
            throw new Error("File doesn't exist")
        }

        file.isDeleted = true
        await file.save()

        res.json(successFormat({ data: "File is deleted" }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}

module.exports.deleteFolder = async (req, res) => {
    try {
        const { _id } = req.user
        const { folderId } = req.params

        const user = await User.findOne({ isDeleted: false, _id })
        if (!user) {
            throw new Error("User doesn't exist")
        }

        if (!user.folders || user.folders.length === 0) {
            throw new Error("User doesn't have any folders")
        }

        const folder = user.folders.find(item => !item.isDeleted && item._id == folderId)
        if (!folder) {
            throw new Error("Folder doesn't exist")
        }

        folder.isDeleted = true
        await user.save()

        res.json(successFormat({ data: "Folder is deleted" }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}

module.exports.rollbackFile = async (req, res) => {
    try {
        const userId = req.user._id
        const { _id } = req.params

        const file = await File.findOne({ isDeleted: true, _id, userId })
        if (!file) {
            throw new Error("File doesn't exist")
        }

        file.isDeleted = false
        await file.save()

        res.json(successFormat({ data: "File is rolled back" }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}

module.exports.rollbackFolder = async (req, res) => {
    try {
        const { _id } = req.user
        const { folderId } = req.params

        const user = await User.findOne({ isDeleted: false, _id })
        if (!user) {
            throw new Error("User doesn't exist")
        }

        const folder = user.folders.find(item => item.isDeleted && item._id == folderId)
        if (!folder) {
            throw new Error("Folder doesn't exist")
        }

        folder.isDeleted = false
        await user.save()

        res.json(successFormat({ data: "Folder is rolled back" }))
    } catch (err) {
        res.json(errorFormat(err.message))
    }
}