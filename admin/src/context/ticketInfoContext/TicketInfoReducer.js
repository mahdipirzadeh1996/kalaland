const TicketInfoReducer = (state, action) => {
    switch (action.type) {
        case "TICKETINFO_START":
            return {
                ticketInfo: null,
                isFetchingTicketInfo: true,
                error: false,
            };
        case "TICKETINFO_SUCCESS":
            return {
                ticketInfo: action.payload,
                isFetchingTicketInfo: false,
                error: false,
            };
        case "TICKETINFO_FAILURE":
            return {
                ticketInfo: null,
                isFetchingTicketInfo: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default TicketInfoReducer;