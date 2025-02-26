export const withStart = () => ({
    type: "WITH_START"
});
export const withSuccess = (withs) => ({
    type: "WITH_SUCCESS",
    payload: withs,
});
export const withFailure = () => ({
    type: "WITH_FAILURE"
});