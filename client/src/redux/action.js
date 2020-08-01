import { login, getInfo, getFileAndFolder, uploadFiles, deleteFile, deleteFolder, rollbackFile, rollbackFolder } from "../utils/api"
import noti from "../utils/noti"
import history from "../configs/history"

export const setLoading = status => async dispatch => dispatch({ type: "SET_LOADING", payload: status })

export const setModal = payload => async dispatch => dispatch({ type: "SET_MODAL", payload })

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

export const userLogout = () => async dispatch => {
    localStorage.removeItem("accessToken")
    dispatch({
        type: "SET_USER",
        payload: null
    })
    return
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
        localStorage.removeItem("accessToken")
        history.push("/login")
    }
}

export const userGetFileAndFolder = ({ isDeleted }) => async dispatch => {
    dispatch(setLoading(true))
    try {
        const res = await getFileAndFolder(isDeleted)

        const { files, folders } = res.data

        dispatch({
            type: "SET_FILES_FOLDERS",
            payload: { files, folders }
        })
    } catch (err) {
        noti({
            type: "danger",
            message: err.message
        })
    }
    dispatch(setLoading(false))
}

export const upload = ({ formData, folderId, folderName, cb }) => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await uploadFiles(formData, folderId, folderName)
        if (!res.data.status) {
            dispatch(setModal({
                isOpen: true,
                type: "danger",
                message: res.data.error
            }))
        } else {
            noti({
                title: "Success",
                type: "success",
                message: res.data.data
            })

            if (cb) cb()
        }
    } catch (err) {
        noti({
            type: "danger",
            message: err.message
        })
    }

    dispatch(setLoading(false))
}

export const userDeleteFile = id => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await deleteFile(id)
        if (!res.data.status) {
            throw new Error(res.data.error)
        }

        noti({
            type: "success",
            title: "Success",
            message: res.data.data
        })

        dispatch(userGetFileAndFolder({ isDeleted: false }))
    } catch (err) {
        dispatch(setModal({
            type: "danger",
            message: err.message
        }))
    }

    dispatch(setLoading(false))
}

export const userDeleteFolder = id => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await deleteFolder(id)
        if (!res.data.status) {
            throw new Error(res.data.error)
        }

        noti({
            type: "success",
            title: "Success",
            message: res.data.data
        })

        dispatch(userGetFileAndFolder({ isDeleted: false }))

    } catch (err) {
        dispatch(setModal({
            type: "danger",
            message: err.message
        }))
    }

    dispatch(setLoading(false))
}

export const userRollbackFile = id => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await rollbackFile(id)
        if (!res.data.status) {
            throw new Error(res.data.error)
        }

        noti({
            type: "success",
            title: "Success",
            message: res.data.data
        })

        dispatch(userGetFileAndFolder({ isDeleted: true }))
    } catch (err) {
        dispatch(setModal({
            type: "danger",
            message: err.message
        }))
    }

    dispatch(setLoading(false))
}

export const userRollbackFolder = id => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await rollbackFolder(id)
        if (!res.data.status) {
            throw new Error(res.data.error)
        }

        noti({
            type: "success",
            title: "Success",
            message: res.data.data
        })

        dispatch(userGetFileAndFolder({ isDeleted: true }))

    } catch (err) {
        dispatch(setModal({
            type: "danger",
            message: err.message
        }))
    }

    dispatch(setLoading(false))
} 