import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

const ProtectedRoute = () => {
  const { user, loading } = useContext(MyStore);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
    <>
      <Navbar/>
      <Outlet />
    </>
    );
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;