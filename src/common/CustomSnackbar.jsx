import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDashboardContext } from "../context/DashboardContextProvider";

const CustomSnackbar = () => {
  const { alert, setAlert } = useDashboardContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, message: "", type: "success" });
  };
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={alert.type} variant="filled">
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
