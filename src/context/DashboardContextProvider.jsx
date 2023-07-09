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
  const [userDetails, setUserDetails] = useState([
    {
      uid: "tQ173fdZ7qdhVCvA2UWQHaFCmk32",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/users-dashboard-ui.appspot.com/o/images%2Fgirl.jfifa67f630b-d635-4b8c-847f-c8fe879b7189?alt=media&token=fc25ca45-fa8f-4ce4-8e50-905b72f5850b",
      name: "Super Admin",
    },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    if (auth.currentUser) {
      setUser(user);
    }
  }, [auth.currentUser]);

  return (
    <dashboardContext.Provider
      value={{
        alert,
        setAlert,
        user,
        userDetails,
        setUserDetails,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardContextProvider;

export const useDashboardContext = () => {
  return useContext(dashboardContext);
};
