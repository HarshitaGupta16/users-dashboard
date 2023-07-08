import React from "react";
import Logout from "./Logout";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>Home</div>
      <Logout />
    </div>
  );
};

export default Home;
