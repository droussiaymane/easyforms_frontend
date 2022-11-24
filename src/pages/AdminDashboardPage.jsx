import React, { useEffect, useState } from "react"
import { TopBarComponent } from "../components/TopBarComponent"
import UsersTableComponent from '../components/UsersTableComponent';
import Container from '@mui/material/Container';
import AddUserComponent from "../components/AddUserComponent";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";


export const AdminDashboardPage = () => {
    const navigate = useNavigate();
   
    useEffect(()=>{
        const role=authService.getCurrentRole();
        const islogged=authService.islogged()

        if(!islogged){
            authService.logout()
            navigate("/")
        }

        else if(role!='ROLE_ADMIN'){
navigate("/userDashboard")
        }
        
    },[])
    return(
        <>   
            <TopBarComponent />
            <br />
            <AddUserComponent />
            <br />
            <Container maxWidth="200px">
                <UsersTableComponent />
            </Container>
            
        </>
    )
}