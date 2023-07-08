import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useDashboardContext } from "../context/DashboardContextProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setAlert } = useDashboardContext();
  const navigate = useNavigate();

  const logOutHandler = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "Logout Successfull !",
      type: "success",
    });
    navigate("/");
  };
  return (
    <Button
      variant="outlined"
      style={{
        textTransform: "none",
        backgroundColor: "white",
        padding: "0 20px",
        fontSize: "1.2rem",
        height: "45px",
        alignSelf: "center",
      }}
      onClick={logOutHandler}
    >
      Logout
    </Button>
  );
};

export default Logout;
