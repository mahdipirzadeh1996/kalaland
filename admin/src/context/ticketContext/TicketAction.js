export const ticketStart = () => ({
    type: "TICKET_START"
});
export const ticketSuccess = (tickets) => ({
    type: "TICKET_SUCCESS",
    payload: tickets,
});
export const ticketFailure = () => ({
    type: "TICKET_FAILURE"
});