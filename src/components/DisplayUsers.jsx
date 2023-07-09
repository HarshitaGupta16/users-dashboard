import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styles from "./DisplayUsers.module.css";
import { CircularProgress } from "@mui/material";
import SingleUser from "./SingleUser";
import { useDashboardContext } from "../context/DashboardContextProvider";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const { setAlert } = useDashboardContext();

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => doc.data()));
  };

  const handleUpdate = async (id, name, email, role, type, status) => {
    let docId;
    const q = query(collection(db, "users"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      console.log(doc.id);
    });
    const userDoc = doc(db, "users", docId);

    const newFields = {
      name: name,
      email: email,
      role: role,
      type: type,
      status: status,
    };
    updateDoc(userDoc, newFields).then(() => {
      setAlert({
        open: true,
        message: "User updated successfully",
        type: "success",
      });
    });
  };

  const handleDelete = async (id) => {
    let docId;
    const q = query(collection(db, "users"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      console.log(doc.id);
    });
    const userDoc = doc(db, "users", docId);
    console.log("userDoc", userDoc);
    deleteDoc(userDoc).then(() => {
      console.log("deleted");
      setAlert({
        open: true,
        message: "User Deleted Succuessfully",
        type: "success",
      });
    });
  };

  useEffect(() => {
    getUsers();
  }, [handleDelete, handleUpdate]);

  const columns = ["Name", "Email", "Role", "Type", "Status", ""];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 30px",
        border: "1px solid #ccc",
        margin: "10px",
      }}
    >
      <div className={styles.header}>
        {columns.map((header) => (
          <div
            style={{
              width: header === "Type" || header === "Status" ? "10%" : "20%",
            }}
          >
            {header}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {!users.length ? (
          <CircularProgress />
        ) : (
          users.map((user) => {
            return (
              <SingleUser
                user={user}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default DisplayUsers;
