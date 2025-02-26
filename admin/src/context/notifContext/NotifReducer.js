const NotifReducer = (state, action) => {
    switch (action.type) {
        case "NOTIF_START":
            return {
                notif: null,
                isFetchingNotif: true,
                error: false,
            };
        case "NOTIF_SUCCESS":
            return {
                notif: action.payload,
                isFetchingNotif: false,
                error: false,
            };
        case "NOTIF_FAILURE":
            return {
                notif: null,
                isFetchingNotif: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default NotifReducer;