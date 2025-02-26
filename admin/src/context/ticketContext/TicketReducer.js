const TicketReducer = (state, action) => {
    switch (action.type) {
        case "TICKET_START":
            return {
                tickets: null,
                isFetchingTicket: true,
                error: false,
            };
        case "TICKET_SUCCESS":
            return {
                tickets: action.payload,
                isFetchingTicket: false,
                error: false,
            };
        case "TICKET_FAILURE":
            return {
                tickets: null,
                isFetchingTicket: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default TicketReducer;