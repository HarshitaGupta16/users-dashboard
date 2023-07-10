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
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");

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
        isAdmin,
        setIsAdmin,
        role,
        setRole,
        profilePic,
        setProfilePic,
        userName,
        setUserName,
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
