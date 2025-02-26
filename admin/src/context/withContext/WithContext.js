import React, { createContext, useReducer } from "react";

import WithReducer from "./WihReducer";

const INITIAL_STATE = {
    withs: null,
    isFetchingWith: false,
    error: false,
};

export const WithContext = createContext(INITIAL_STATE);

export const WithContextProvider = ({ children }) => {
    const [state, dispatchWith] = useReducer(WithReducer, INITIAL_STATE);

    return (
        <WithContext.Provider
            value={{
                withs: state.withs,
                isFetchingWith: state.isFetchingWith,
                error: state.error,
                dispatchWith
            }}
        >
            {children}
        </WithContext.Provider>
    )
}