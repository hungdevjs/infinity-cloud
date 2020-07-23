import { login } from "../utils/api"
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