import React, { useEffect, createContext, useReducer } from "react";

import EmailReducer from "./EmailReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
}; 

export const EmailContext = createContext(INITIAL_STATE);

export const EmailContextProvider = ({ children }) => {
    const [state, emailDispatch] = useReducer(EmailReducer, INITIAL_STATE); 

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <EmailContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                emailDispatch
            }}
        >
            {children}
        </EmailContext.Provider>
    )
}