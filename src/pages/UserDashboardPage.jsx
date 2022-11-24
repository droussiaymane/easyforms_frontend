import React, { useEffect, useState } from "react"
import FormsComponent from "../components/FormsComponent"
import SignInComponent from "../components/SignInComponent"
import { TopBarComponent } from "../components/TopBarComponent"
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";


export const UserDashboardPage = () => {
    const navigate = useNavigate();
   
    useEffect(()=>{
        const islogged=authService.islogged()

        if(!islogged){
            authService.logout()
            navigate("/")
        }
        

      

         
        
    },[])
    return(
        // <SignInComponent signInValue={signInValue} />
        <>
            <TopBarComponent />
            <br />
            <FormsComponent />
            <p>I am the user Dashboard!</p> 
        </>
    )
}