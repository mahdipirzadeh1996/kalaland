export const plansStart = () => ({
    type: "PLANS_START"
});
export const plansSuccess = (plans) => ({
    type: "PLANS_SUCCESS",
    payload: plans,
});
export const plansFailure = () => ({
    type: "PLANS_FAILURE"
});