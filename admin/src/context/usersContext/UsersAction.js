export const usersStart = () => ({
    type: "USERS_START"
});
export const usersSuccess = (users) => ({
    type: "USERS_SUCCESS",
    payload: users,
});
export const usersFailure = () => ({
    type: "USERS_FAILURE"
});