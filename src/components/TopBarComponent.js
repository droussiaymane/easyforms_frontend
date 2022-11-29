import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Avatar from "@mui/material/Avatar";
import { green, pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, fabClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUsername, getUserRole } from "../services/user.service";

import { Link } from "react-router-dom";

import { height } from "@mui/system";

export const TopBarComponent = () => {
  const [switched, setSwitched] = useState(sessionStorage.getItem("switched"));

  const navigate = useNavigate();
  let userName = getUsername();
  let userRole = getUserRole();
  useEffect(() => {});

  function handleLogout() {
    AuthService.logout();
    navigate("/");
  }
  function switchHandle() {
    AuthService.logout();
    localStorage.setItem("user", localStorage.getItem("user_"));
    localStorage.setItem("id", localStorage.getItem("id_"));
    localStorage.setItem("role", JSON.stringify("ROLE_ADMIN"));
    localStorage.setItem("switched", false);
    navigate("/AdminDashboard");
  }
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <img
                src={require("../Images/resume.png")}
                height={40}
                width={40}
              />

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TeamSpace
              </Typography>
            </Stack>
            <div className="marginLeft">
              <p>
                {switched == "true" && (
                  <Button
                    onClick={switchHandle}
                    style={{ backgroundColor: "white" }}
                  >
                    SWITCH BACK
                  </Button>
                )}

                <div class="dropdown paddingLeftPlus">
                  <button
                    style={{ fontSize: "x-large", marginTop: "10%" }}
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class=" btn btn-style-1 btn-primary avatar avatar-48 bg-white text-dark rounded-2"
                  >
                    {userName && userName.charAt(0)}
                  </button>

                  <div
                    class="dropdown-menu"
                    style={{ marginRight:100 }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link to="/settings">
                      <a class="dropdown-item">My Profile</a>
                    </Link>
                    <Link to="/settings:changePsw">
                      <a class="dropdown-item">Change Password</a>
                    </Link>
                    <div onClick={handleLogout}>
                      <span style={{cursor: "pointer", color: "#007bff"}} class="dropdown-item">Logout</span>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            {userRole == "ADMIN" && (
              <li class="nav-item active">
                <Link to="/getallusers">
                  {" "}
                  <a class="nav-link">
                    Users <span class="sr-only"></span>
                  </a>
                </Link>
              </li>
            )}

            <li class="nav-item active">
              <Link to="/getallforms">
                {" "}
                <a class="nav-link">
                  Forms <span class="sr-only"></span>
                </a>
              </Link>
            </li>
          </ul>
          <p className="paddingLeftPlus">
            EMAIL : {userName} , ROLE : {userRole}
            <span> </span>
          </p>
        </div>
      </nav>
    </>
  );
};
