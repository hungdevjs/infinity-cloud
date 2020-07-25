const axios = require("axios")

const botToken = process.env.ICQ_BOT_TOKEN
const chatId = process.env.ICQ_CHAT_ID

const BASE_URL = "https://api.icq.net/bot/v1"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
})

const apiUpload = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

module.exports.getFileInfo = fileId => api.get(`/files/getInfo?token=${botToken}&fileId=${fileId}`)

module.exports.sendFile = file => apiUpload.post(`/messages/sendFile?token=${botToken}&chatId=${chatId}`, file)
