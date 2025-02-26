export const ticketInfoStart = () => ({
    type: "TICKETINFO_START"
});
export const ticketInfoSuccess = (ticketInfo) => ({
    type: "TICKETINFO_SUCCESS",
    payload: ticketInfo,
});
export const ticketInfoFailure = () => ({
    type: "TICKETINFO_FAILURE"
});