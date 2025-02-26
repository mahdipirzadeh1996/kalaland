import React, {  createContext, useReducer } from "react";

import NotifReducer from "./NotifReducer";

const INITIAL_STATE = {
    notif: null,
    isFetchingNotif: false,
    error: false,
};

export const NotifContext = createContext(INITIAL_STATE);

export const NotifContextProvider = ({ children }) => {
    const [state, dispatchNotif] = useReducer(NotifReducer, INITIAL_STATE);

    return (
        <NotifContext.Provider
            value={{
                notif: state.notif,
                isFetchingNotif: state.isFetchingNotif,
                error: state.error,
                dispatchNotif
            }}
        >
            {children}
        </NotifContext.Provider>
    )
}