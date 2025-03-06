'use client'
import { createContext, useReducer, useEffect } from "react";

import { registerReducer } from "./RegisterReducer";
import { fetchUser } from "./RegisterAction";

export const RegisterContext = createContext();

const initialState = {
  emailMessage: null,
  userInfo: null,
  isLoading: false,
  error: null,
};

export const RegisterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};
