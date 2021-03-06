export default (state = {
    user: null,
    isLoading: false,
    modal: {
        isOpen: false,
        type: null,
        message: null,
        onConfirm: null
    },
    files: null,
    folders: null
}, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }

        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }

        case "SET_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload
                }
            }

        case "SET_FILES_FOLDERS":
            return {
                ...state,
                files: action.payload.files,
                folders: action.payload.folders
            }

        default:
            return state
    }
}