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

export const getFileAndFolder = isDeleted => api.get(`/api/file/fileAndFolder?isDeleted=${isDeleted}`)

export const getFileInfo = id => api.get(`/api/file/${id}`)

export const uploadFiles = (formData, folderId = "", folderName = "") => apiUpload.post(`/api/file/upload?folderId=${folderId}&folderName=${folderName}`, formData)

export const getAllFolders = () => api.get("/api/file/folders")

export const deleteFile = id => api.delete(`/api/file/${id}`)

export const deleteFolder = id => api.delete(`/api/file/folders/${id}`)

export const rollbackFile = id => api.post(`/api/file/rollback/${id}`)

export const rollbackFolder = id => api.post(`/api/file/folders/rollback/${id}`)