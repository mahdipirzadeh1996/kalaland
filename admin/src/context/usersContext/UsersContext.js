import React, { createContext, useReducer } from "react";

import UsersReducer from "./UsersReducer";

const INITIAL_STATE = {
    users: null,
    isFetchingUsers: false,
    error: false,
};

export const UsersContext = createContext(INITIAL_STATE);

export const UsersContextProvider = ({ children }) => {
    const [state, dispatchUsers] = useReducer(UsersReducer, INITIAL_STATE);

    return (
        <UsersContext.Provider
            value={{
                users: state.users,
                isFetchingUsers: state.isFetchingUsers,
                error: state.error,
                dispatchUsers
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}