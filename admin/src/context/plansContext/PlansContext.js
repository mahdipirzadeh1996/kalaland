import React, { useEffect, createContext, useReducer } from "react";

import PlansReducer from "./PlansReducer";

const INITIAL_STATE = {
    plans: null,
    isFetching: false,
    error: false,
};

export const PlansContext = createContext(INITIAL_STATE);

export const PlansContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlansReducer, INITIAL_STATE);

    return (
        <PlansContext.Provider
            value={{
                plans: state.plans,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </PlansContext.Provider>
    )
}