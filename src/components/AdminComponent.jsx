import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminComponent = () => {
  const authAdmin = JSON.parse(localStorage.getItem("Info"));
  // console.log(authAdmin.user.role);
  return authAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminComponent;
