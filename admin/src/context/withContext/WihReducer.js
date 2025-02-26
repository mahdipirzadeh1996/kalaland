const WithReducer = (state, action) => {
    switch (action.type) {
        case "WITH_START":
            return {
                withs: null,
                isFetchingWith: true,
                error: false,
            };
        case "WITH_SUCCESS":
            return {
                withs: action.payload,
                isFetchingWith: false,
                error: false,
            };
        case "WITH_FAILURE":
            return {
                withs: null,
                isFetchingWith: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default WithReducer;