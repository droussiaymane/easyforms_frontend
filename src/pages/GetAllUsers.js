import React, { useEffect, useState } from "react";
import { TopBarComponent } from "../components/TopBarComponent";
import UsersTableComponent from "../components/UsersTableComponent";
import Container from "@mui/material/Container";
import AddUserComponent from "../components/AddUserComponent";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export const GetAllUsers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = authService.getCurrentRole();
    const islogged = authService.islogged();

    if (!islogged) {
      authService.logout();
      navigate("/");
    } else if (!role.includes("ROLE_ADMIN")) {
      navigate("/getallforms");
    }
  }, []);
  return (
    <>
      <TopBarComponent />
      <br />
      <AddUserComponent />
      <br />
      <Container maxWidth="200px">
        <UsersTableComponent />
      </Container>
    </>
  );
};
