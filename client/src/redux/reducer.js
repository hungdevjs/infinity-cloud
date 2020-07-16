export default (state = {
    user: { name: 'hung' },
    isLoading: false,
    isOpen: false
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

        default:
            return state
    }
}