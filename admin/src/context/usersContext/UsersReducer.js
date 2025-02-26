const UsersReducer = (state, action) => {
    switch (action.type) {
        case "USERS_START":
            return {
                users: null,
                isFetchingUsers: true,
                error: false,
            };
        case "USERS_SUCCESS":
            return {
                users: action.payload,
                isFetchingUsers: false,
                error: false,
            };
        case "USERS_FAILURE":
            return {
                users: null,
                isFetchingUsers: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default UsersReducer;