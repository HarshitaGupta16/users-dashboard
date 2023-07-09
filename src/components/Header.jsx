import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { useDashboardContext } from "../context/DashboardContextProvider";

const Header = ({ title }) => {
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
        <Logout />
      </div>
    </div>
  );
};

export default Header;
