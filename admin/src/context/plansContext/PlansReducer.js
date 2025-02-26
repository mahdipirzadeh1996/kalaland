const PlansReducer = (state, action) => {
    switch (action.type) {
        case "PLANS_START":
            return {
                plans: null,
                isFetching: true,
                error: false,
            };
        case "PLANS_SUCCESS":
            return {
                plans: action.payload,
                isFetching: false,
                error: false,
            };
        case "PLANS_FAILURE":
            return {
                plans: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default PlansReducer;