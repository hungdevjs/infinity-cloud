export default (state = {
    user: null,
    isLoading: false,
    isOpen: false,
    modal: {
        isOpen: false,
        type: null,
        message: null,
        onConfirm: null
    }
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
                modal: action.payload
            }

        default:
            return state
    }
}