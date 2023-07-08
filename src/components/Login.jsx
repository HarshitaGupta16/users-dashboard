import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDashboardContext } from "../context/DashboardContextProvider";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = useDashboardContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login successful! Welcom ${result.user.email}`,
        type: "success",
      });
      navigate("/home");
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign In Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        navigate("/home");
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div className={styles.background}>
      <Typography variant="h1">
        Users <br /> Dashboard
      </Typography>
      <Box sx={{ boxShadow: "3px 3px 5px 6px #ccc" }}>
        <FormControl
          sx={{
            m: 4,
            width: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Enter Email"
            variant="outlined"
            style={{
              marginBottom: 20,
              background: "white",
              borderRadius: "5px",
            }}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Enter Password"
            variant="outlined"
            type="password"
            style={{
              marginBottom: 20,
              background: "white",
              borderRadius: "5px",
            }}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            style={{ padding: 10, textTransform: "none" }}
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <div style={{ marginBottom: "15px" }}>OR</div>
            <GoogleButton
              onClick={signInWithGoogle}
              style={{ width: "100%" }}
            />
          </Box>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;
