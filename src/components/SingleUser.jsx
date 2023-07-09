import { IconButton } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useDashboardContext } from "../context/DashboardContextProvider";

const SingleUser = ({ user, handleDelete, handleUpdate }) => {
  const { isAdmin } = useDashboardContext();
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [type, setType] = useState(user.type);
  const [status, setStatus] = useState(user.status);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {!isEdit ? (
        <>
          <div
            style={{
              width: "20%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {user.name}
          </div>
          <div
            style={{
              width: "20%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {user.email}
          </div>
          <div
            style={{
              width: "20%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {user.role}
          </div>
          <div
            style={{
              width: "10%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {user.type}
          </div>
          <div
            style={{
              width: "10%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {user.status}
          </div>
          <IconButton
            disabled={!isAdmin}
            style={{
              width: "10%",
              color: !isAdmin ? "rgba(0, 0, 0, 0.26)" : "#1976d2",
            }}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <>
          <input
            style={{ width: "20%" }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            style={{ width: "20%" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <select
            style={{ width: "20%" }}
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value={"Administrator"}>Administrator</option>
            <option value="Writer">Writer</option>
            <option value="Author">Author</option>
            <option value="Contributor">Contributor</option>
            <option value="Editor">Editor</option>
            <option value="Manager">Manager</option>
          </select>
          <select
            style={{ width: "20%" }}
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>
          <select
            style={{ width: "20%" }}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
          <IconButton
            disabled={!isAdmin}
            style={{ width: "10%" }}
            onClick={() => {
              setIsEdit(false);
              handleUpdate(user.uid, name, email, role, type, status);
            }}
          >
            <DoneIcon />
          </IconButton>
        </>
      )}
      <div style={{ width: "10%" }}>
        <IconButton
          disabled={!isAdmin}
          onClick={() => handleDelete(user.uid)}
          style={{ color: !isAdmin ? "rgba(0, 0, 0, 0.26)" : "red" }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SingleUser;
