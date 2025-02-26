export const notifStart = () => ({
    type: "NOTIF_START"
});
export const notifSuccess = (notif) => ({
    type: "NOTIF_SUCCESS",
    payload: notif,
});
export const notifFailure = () => ({
    type: "NOTIF_FAILURE"
});