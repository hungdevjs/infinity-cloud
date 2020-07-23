import { login, getInfo } from "../utils/api"
import noti from "../utils/noti"
import history from "../configs/history"

export const setLoading = status => ({ type: "SET_LOADING", payload: status })

export const userLogin = data => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await login(data)
        if (!res.data || !res.data.status) {
            throw new Error("Log in failed")
        }

        const accessToken = res.data.accessToken
        localStorage.setItem("accessToken", accessToken)

        dispatch({
            type: "SET_USER",
            payload: data.email
        })

        noti({
            title: "Success",
            type: "success",
            message: "Log in successfully"
        })

        history.push("/")
    } catch (err) {
        noti({
            title: "Failed",
            type: "danger",
            message: err.message
        })
    }

    dispatch(setLoading(false))
}

export const userGetInfo = () => async dispatch => {
    try {
        const res = await getInfo()

        if (!res.data || !res.data.status) {
            throw new Error()
        }

        dispatch({
            type: "SET_USER",
            payload: res.data.email
        })

    } catch (err) {
        history.push("/login")
    }
}