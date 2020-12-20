import axios from "axios"
import { BASE_URL } from "./constant"

const getAccessToken = () => localStorage.getItem("accessToken") || ""

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
})

const apiUpload = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {
        "Content-Type": "multipart/form-data",
    }
})

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

apiUpload.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export const login = data => api.post("/account/login", data)

export const getInfo = () => api.get("/account/info")

export const getFileAndFolder = (isDeleted, year, month) => api.get(`/api/file/fileAndFolder?isDeleted=${isDeleted}&year=${year}&month=${month}`)

export const getFileInfo = id => api.get(`/api/file/${id}`)

export const uploadFiles = (formData, folderId, folderName, minutes, seconds) => apiUpload.post(`/api/file/upload?folderId=${folderId}&folderName=${folderName}&minutes=${minutes}&seconds=${seconds}`, formData)

export const rollbackFolder = id => api.post(`/api/file/folders/rollback/${id}`)