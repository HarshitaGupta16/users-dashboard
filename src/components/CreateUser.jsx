import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDashboardContext } from "../context/DashboardContextProvider";
import { v4 as uuid4 } from "uuid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./CreateUser.module.css";
import { Link } from "react-router-dom";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setAlert } = useDashboardContext();

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !role || !image) {
      setAlert({
        open: true,
        message: "Please fill all the required field",
        type: "error",
      });
      setLoading(false);
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const imageRef = ref(storage, `images/${image.name + uuid4()}`);
      // storing image on firebase storage
      uploadBytes(imageRef, image).then(() => {
        // add url of uploaded image in users database with all other details
        getDownloadURL(imageRef)
          .then((imageURL) => {
            addDoc(collection(db, "users"), {
              name: name,
              email: email,
              role: role,
              type: type,
              status: status,
              uid: result.user.uid,
              imageURL: imageURL,
            });
            setAlert({
              open: true,
              message: "User Created Sucessfully!",
              type: "success",
            });
            setLoading(false);
          })
          .catch((error) => {
            setAlert({
              open: true,
              message: error.message,
              type: "error",
            });
            setLoading(false);
          });
      });

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setStatus("");
      setType("");
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      setLoading(false);
    }
  };
  return (
    <div>
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
          label="Enter Name"
          variant="outlined"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          fullWidth
          className={styles.textfield}
        />
        <TextField
          label="Enter Email"
          variant="outlined"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          className={styles.textfield}
        />
        <TextField
          label="Enter Password"
          variant="outlined"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          className={styles.textfield}
        />
        <FormControl fullWidth className={styles.textfield}>
          <InputLabel id="select-role">Select Role</InputLabel>
          <Select
            label="Select Role"
            labelId="select-role"
            variant="outlined"
            value={role}
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={"Administrator"}>Administrator</MenuItem>
            <MenuItem value="Writer">Writer</MenuItem>
            <MenuItem value="Author">Author</MenuItem>
            <MenuItem value="Contributor">Contributor</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className={styles.textfield}>
          <InputLabel id="select-type">Select Type</InputLabel>
          <Select
            label="Select Type"
            labelId="select-type"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className={styles.textfield}>
          <InputLabel id="select-status">Select Status</InputLabel>
          <Select
            label="Select Status"
            labelId="status-status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
        <label className={styles.uploadImage}>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />
          <AddPhotoAlternateIcon style={{ marginRight: 35 }} />
          Upload Profile Picture *
          <span style={{ marginLeft: 10 }}>{image?.name}</span>
        </label>
        <Button
          variant="contained"
          style={{ padding: 10, textTransform: "none" }}
          fullWidth
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress size={25} color="inherit" />
          ) : (
            "Create User"
          )}
        </Button>
      </FormControl>
      <sapn style={{ fontSize: "1.2rem" }}>
        Click here to view all the{" "}
        <Link to="/display-users" className={styles.link}>
          Users
        </Link>
      </sapn>
    </div>
  );
};

export default CreateUser;
