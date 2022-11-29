import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddUserComponent from "../components/AddUserComponent";
import { TopBarComponent } from "../components/TopBarComponent";
import authService from "../services/auth.service";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = authService.getCurrentRole();
    const islogged = authService.islogged();

    if (!islogged) {
      authService.logout();
      navigate("/");
    } else if (!role.includes("ROLE_ADMIN")) {
      navigate("/userDashboard");
    }
  });
  return (
    <>
      <TopBarComponent />
      <br />
    </>
  );
};

export default AdminDashboardPage;
