import { login } from "../utils/api"

export const setLoading = status => ({ type: "SET_LOADING", payload: status })

export const userLogin = data => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await login(data)
        console.log(res.data)
    } catch {

    }

    dispatch(setLoading(false))
}