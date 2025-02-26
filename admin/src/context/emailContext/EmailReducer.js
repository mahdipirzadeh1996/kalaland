const EmailReducer = (state, action) => {
    switch (action.type) {
        case "EMAIL_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "EMAIL_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "EMAIL_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return { ...state };
    }
}

export default EmailReducer;