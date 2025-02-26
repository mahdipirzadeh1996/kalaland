export const newsStart = () => ({
    type: "NEWS_START"
});
export const newsSuccess = (news) => ({
    type: "NEWS_SUCCESS",
    payload: news,
});
export const newsFailure = () => ({
    type: "NEWS_FAILURE"
});