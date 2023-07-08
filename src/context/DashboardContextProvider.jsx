import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const dashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log(user);
    });
  }, []);

  return (
    <dashboardContext.Provider value={{ alert, setAlert, user }}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardContextProvider;

export const useDashboardContext = () => {
  return useContext(dashboardContext);
};
