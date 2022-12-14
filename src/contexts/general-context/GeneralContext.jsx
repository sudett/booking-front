import React, { useContext, useReducer, useEffect } from "react";

import { generalReducer, INITIAL_STATE } from "./GeneralReducer";

const GeneralContext = React.createContext();

export const GeneralProvider = ({ children }) => {
  const [state, dispatch] = useReducer(generalReducer, INITIAL_STATE);

  // save user in local storage to keep user in page refresh
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.auth.user));
  }, [state.auth.user]);

  return (
    <GeneralContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};
