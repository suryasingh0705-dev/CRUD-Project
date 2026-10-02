import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../context/AuthContext";

const PublicRoute = () => {
  const { user } = useContext(MyStore);

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;