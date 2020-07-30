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

module.exports.getFileInfo = fileId => api.get(`/files/getInfo?token=${botToken}&fileId=${fileId}`)

module.exports.sendFile = formData => axios({
    method: "post",
    url: `https://api.icq.net/bot/v1/messages/sendFile?token=${botToken}&chatId=${chatId}`,
    data: formData,
    headers: { ...formData.getHeaders() }
});
