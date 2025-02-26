export const emailStart = () => ({
    type: "EMAIL_START"
});
export const emailSuccess = (user) => ({
    type: "EMAIL_SUCCESS",
    payload: user,
});
export const emailFailure = () => ({
    type: "EMAIL_FAILURE"
});
export const logout = () => ({
    type: "LOGOUT",
});