'use client'
import { createContext, useReducer, useContext } from "react";
import { userReducer } from "./UserReducer";

const UserContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
