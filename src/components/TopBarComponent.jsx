import React, { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Avatar from '@mui/material/Avatar';
import { green, pink } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, fabClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUsername,getUserRole } from '../services/user.service';
import { Link } from "react-router-dom";

export const TopBarComponent = () => {
    const [switched,setSwitched]=useState(sessionStorage.getItem("switched"))
    
    
    const navigate = useNavigate();
    let userName=getUsername();
    let userRole=getUserRole();

    function handleLogout(){
        AuthService.logout();
                navigate("/");
    }
    function switchHandle(){
        AuthService.logout();
        localStorage.setItem("user",localStorage.getItem('user_'))
localStorage.setItem("id",localStorage.getItem('id_'))
localStorage.setItem("role",JSON.stringify('ROLE_ADMIN'))
        sessionStorage.setItem("switched",false)
        navigate("/AdminDashboard");
    }
    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Avatar sx={{ bgcolor: pink[500] }}>
                            <CalendarMonthOutlinedIcon />
                        </Avatar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TEAM SPACE APPLICATION
                        </Typography>
                        <Button onClick={handleLogout}>
                            <Avatar sx={{ bgcolor: pink[500] }}>
                                <LogoutIcon />
                            </Avatar>
                        </Button>
                       
                      
                    </Stack>
                    <div className="marginLeft">
                        <p
                            
                            >
                                EMAIL : {userName} , 
                                ROLE : {userRole}<span> </span>
                               {switched=='true' &&  <Button onClick={switchHandle} style={{ backgroundColor:"white"}}>SWITCH BACK</Button>}
                            </p>
                        </div>
                </Toolbar>
               
            </Container>
        </AppBar>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
   <Link to="/"> <a class="navbar-brand" >Home</a></Link>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
      <Link to="/getallusers"> <a class="nav-link" >Users <span class="sr-only"></span></a></Link>
      </li>
      <li class="nav-item active">
      <Link to="/getallforms"> <a class="nav-link" >Forms <span class="sr-only"></span></a></Link>
      </li>
    </ul>
  
  </div>
</nav>
      </>
    )
}