import React, { useEffect, useState } from "react"
import FormsComponent from "../components/FormsComponent"
import SignInComponent from "../components/SignInComponent"
import { TopBarComponent } from "../components/TopBarComponent"
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";


export const UserDashboardPage = () => {
    const navigate = useNavigate();
   
    useEffect(()=>{
        const role=authService.getCurrentRole();
          const islogged=authService.islogged()
  
          if(!islogged){
            authService.logout()
            navigate("/")
        }
  
        else if(role.includes('ROLE_ADMIN')){
  navigate("/AdminDashboard")
        }
    })
    return(
        // <SignInComponent signInValue={signInValue} />
        <>
            <TopBarComponent />
            <br />
            <FormsComponent />
             
        </>
    )
}