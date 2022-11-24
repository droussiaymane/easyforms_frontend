import React, { useEffect, useState } from 'react';
import SignInComponent from "../components/SignInComponent"
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';

export const UserLoginPage = () => {
    const signInValue = "User"
    const navigate = useNavigate();
  let islogged=authService.islogged();
  
  useEffect(()=>{
if(islogged){
  navigate("/AdminDashboard")
}

},[])
    return(
        <SignInComponent globalRole={signInValue} />
    )
}