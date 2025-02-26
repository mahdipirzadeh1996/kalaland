import React, { createContext, useReducer } from "react";

import TicketInfoReducer from "./TicketInfoReducer";

const INITIAL_STATE = {
    ticketInfo: null,
    isFetchingTicketInfo: false,
    error: false,
};

export const TicketInfoContext = createContext(INITIAL_STATE);

export const TicketInfoContextProvider = ({ children }) => {
    const [state, dispatchTicketInfo] = useReducer(TicketInfoReducer, INITIAL_STATE);

    return (
        <TicketInfoContext.Provider
            value={{
                ticketInfo: state.ticketInfo,
                isFetchingTicketInfo: state.isFetchingTicketInfo,
                error: state.error,
                dispatchTicketInfo
            }}
        >
            {children}
        </TicketInfoContext.Provider>
    )
}