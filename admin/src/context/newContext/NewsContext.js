import React, { createContext, useReducer } from "react";

import NewsReducer from "./NewsReducer";

const INITIAL_STATE = {
    news: null,
    isFetching: false,
    error: false,
};

export const NewsContext = createContext(INITIAL_STATE);

export const NewsContextProvider = ({ children }) => {
    const [state, dispatchNews] = useReducer(NewsReducer, INITIAL_STATE);

    return (
        <NewsContext.Provider
            value={{
                news: state.news,
                isFetching: state.isFetching,
                error: state.error,
                dispatchNews
            }}
        >
            {children}
        </NewsContext.Provider>
    )
}