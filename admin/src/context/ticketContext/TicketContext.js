import React, { createContext, useReducer } from "react";

import TicketReducer from "./TicketReducer";

const INITIAL_STATE = {
    tickets: null,
    isFetchingTicket: false,
    error: false,
};

export const TicketContext = createContext(INITIAL_STATE);

export const TicketContextProvider = ({ children }) => {
    const [state, dispatchTicket] = useReducer(TicketReducer, INITIAL_STATE);

    return (
        <TicketContext.Provider
            value={{
                tickets: state.tickets,
                isFetchingTicket: state.isFetchingTicket,
                error: state.error,
                dispatchTicket
            }}
        >
            {children}
        </TicketContext.Provider>
    )
}