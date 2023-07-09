import React, { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import Header from "./Header";
import { useDashboardContext } from "../context/DashboardContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import DisplayUsers from "./DisplayUsers";

const Home = () => {
  const { user, setIsAdmin } = useDashboardContext();

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userData = query(
      collection(db, "users"),
      where("uid", "==", `${user?.uid}`)
    );
    const querySnapshot = await getDocs(userData);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      setProfilePic(doc.data().imageURL);
      if (doc.data().role === "Administrator") {
        setShowCreateUser(true);
        setIsAdmin(true);
      } else {
        setShowCreateUser(false);
        setIsAdmin(false);
      }
    });
  };

  return (
    <div>
      <Header
        title={showCreateUser ? "Create Users" : "Users"}
        profilePic={profilePic}
      />
      {showCreateUser ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CreateUser />
        </div>
      ) : (
        <DisplayUsers />
      )}
    </div>
  );
};

export default Home;
