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
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import SingleUser from "./SingleUser";
import { useDashboardContext } from "../context/DashboardContextProvider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState({ column: "", type: "ASC" });
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);

  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");
  let sortedUsers = users;

  if (sortBy.type === "ASC") {
    sortedUsers = users.sort((a, b) => {
      if (a[sortBy.column]?.toLowerCase() < b[sortBy.column]?.toLowerCase()) {
        return -1;
      }
      if (a[sortBy.column]?.toLowerCase() > b[sortBy.column]?.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else if (sortBy.type === "DESC") {
    sortedUsers = users.sort((a, b) => {
      if (a[sortBy.column]?.toLowerCase() < b[sortBy.column]?.toLowerCase()) {
        return 1;
      }
      if (a[sortBy.column]?.toLowerCase() > b[sortBy.column]?.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  const { setAlert, role } = useDashboardContext();

  const getUsers = async () => {
    setLoading(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => doc.data()));
    setLoading(false);
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

  const handlePage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(users.length / 5) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
    return;
  };

  const handleSearch = () => {
    if (role !== "All" && role !== "") {
      setSearchedResults(sortedUsers.filter((user) => user.role === role));
    } else if (searchText !== "") {
      let result = sortedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.role.toLowerCase().includes(searchText) ||
          user.type.toLowerCase().includes(searchText) ||
          user.status.toLowerCase().includes(searchText)
      );
      setSearchedResults(result);
    } else if (role === "All") {
      setSearchedResults(sortedUsers);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [role]);

  const paginationNumbers = () => {
    if (searchText !== "" || role !== "All" || role !== "")
      return [...Array(Math.ceil(sortedUsers.length / 5))];
    else {
      return [...Array(Math.ceil(handleSearch(sortedUsers).length / 5))];
    }
  };

  const columns = ["Name", "Email", "Role", "Type", "Status", ""];

  return (
    <div>
      <div className={styles.search}>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          className={styles.backBtn}
        >
          ⬅️ Back
        </Button>

        <div>
          <label>Search:</label>
          <input
            onChange={(e) => {
              setSearchText(e.target.value.toLowerCase());
            }}
          />
        </div>
      </div>
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
                display: "flex",
                justifyContent: "start",
                alignItems: "self-start",
              }}
            >
              {header}
              {header !== "" && (
                <>
                  <ArrowUpwardIcon
                    onClick={() =>
                      setSortBy({ column: header.toLowerCase(), type: "ASC" })
                    }
                    style={{ cursor: "pointer", color: "rgba(0, 0, 0, 0.54)" }}
                  />

                  <ArrowDownwardIcon
                    onClick={() =>
                      setSortBy({ column: header.toLowerCase(), type: "DESC" })
                    }
                    style={{ cursor: "pointer", color: "rgba(0, 0, 0, 0.54)" }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className={styles.body}>
          {loading ? (
            <CircularProgress />
          ) : searchText !== "" || role !== "All" || role !== "" ? (
            searchedResults.slice(page * 5 - 5, page * 5).map((user, i) => {
              return (
                <SingleUser
                  key={i}
                  user={user}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              );
            })
          ) : (
            sortedUsers.slice(page * 5 - 5, page * 5).map((user, i) => {
              return (
                <SingleUser
                  key={i}
                  user={user}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              );
            })
          )}
          {searchedResults.length === 0 &&
            !loading &&
            (searchText !== "" || role !== "" || role !== "All") && (
              <div style={{ alignSelf: "center" }}>No data found</div>
            )}
        </div>
      </div>
      <div className={styles.pagination}>
        <Button
          onClick={() => handlePage(page - 1)}
          style={{
            textTransform: "none",
            color: "gray",
            border: "1px solid #ccc",
            borderRadius: 0,
          }}
        >
          Previous
        </Button>
        <span>
          {paginationNumbers().map((_, i) => {
            return (
              <span
                onClick={() => handlePage(i + 1)}
                key={i}
                style={{
                  border: "0.5px solid #ccc",
                  padding: "8px 15px",

                  cursor: "pointer",
                  backgroundColor: page === i + 1 ? "#1976d2" : "white",
                  color: page === i + 1 ? "white" : "black",
                }}
              >
                {i + 1}
              </span>
            );
          })}
        </span>
        <Button
          onClick={() => handlePage(page + 1)}
          style={{
            textTransform: "none",
            color: "gray",
            border: "1px solid #ccc",
            borderRadius: 0,
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DisplayUsers;
