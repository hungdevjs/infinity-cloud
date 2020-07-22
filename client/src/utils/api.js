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

export default api

export const login = data => api.post("/account/login", data)
