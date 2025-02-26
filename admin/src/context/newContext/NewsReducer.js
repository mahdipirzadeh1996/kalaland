const NewsReducer = (state, action) => {
    switch (action.type) {
        case "NEWS_START":
            return {
                news: null,
                isFetching: true,
                error: false,
            };
        case "NEWS_SUCCESS":
            return {
                news: action.payload,
                isFetching: false,
                error: false,
            };
        case "NEWS_FAILURE":
            return {
                news: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default NewsReducer;