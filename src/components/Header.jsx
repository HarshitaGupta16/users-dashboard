import {
  Avatar,
  Box,
  MenuItem,
  Select,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { useDashboardContext } from "../context/DashboardContextProvider";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Header = ({ title, setRole }) => {
  const { userDetails, user } = useDashboardContext();
  const [profilePicURL, setProfilePicURL] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const info = userDetails?.find((userDetail) => userDetail.uid === user.uid);
    setProfilePicURL(info?.imageURL);
    setUserName(info?.name);
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#0284c7",
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" style={{ color: "white" }}>
        {title}
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "white", marginRight: 10 }}>
          Welcome! {userName}
        </span>
        <Avatar
          src={profilePicURL}
          sx={{ width: 56, height: 56, marginRight: 10 }}
        />
        <Box sx={{ marginRight: 5 }}>
          <Select
            sx={{
              width: 160,
              gap: 1,
              backgroundColor: "white",
              height: "45px",
              borderRadius: "1px solid",
              color: "#1976d2",
            }}
            defaultValue="Roles"
            displayEmpty
            variant="outlined"
            onChange={(e) => {
              setRole(e.target.value);
            }}
            renderValue={(value) => {
              return (
                <Box sx={{ display: "flex" }}>
                  <SvgIcon color="primary">
                    <PersonSearchIcon />
                  </SvgIcon>
                  {value}
                </Box>
              );
            }}
          >
            <MenuItem value={"Administrator"}>Administrator</MenuItem>
            <MenuItem value="Writer">Writer</MenuItem>
            <MenuItem value="Author">Author</MenuItem>
            <MenuItem value="Contributor">Contributor</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
        </Box>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
