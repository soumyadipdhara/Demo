import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ RoleID }) => {
  const { user } = useContext(UserContext);

  if (!user && !RoleID.includes(user?.RoleID)) {
    return <Navigate to="/" />;
  }
  console.log("User state in UserContext:", user);
  console.log("User role:", RoleID);

  return <Outlet />;
};

export default PrivateRoute;
