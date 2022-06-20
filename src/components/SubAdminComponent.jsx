import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SubAdminComponent = () => {
  const authAdmin = JSON.parse(localStorage.getItem("Info"));
  console.log(authAdmin.user.role);

  return authAdmin.user.role === 2 ? <Outlet /> : <Navigate to="/" />;
};

export default SubAdminComponent;
