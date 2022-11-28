import React, { useEffect, useState } from 'react';
import SignInComponent from "../components/SignInComponent"
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';

export const UserLoginPage = () => {
    const signInValue = "User"
    const navigate = useNavigate();
  let islogged=authService.islogged();
  
  useEffect(()=>{
    const role=authService.getCurrentRole();
      const islogged=authService.islogged()

      if(islogged){
        if(role.includes('ROLE_ADMIN')){
            navigate('/AdminDashboard')
        }
        else{
          navigate('/userDashboard')
        }
    }

   
})


    return(
        <SignInComponent globalRole={signInValue} />
    )
}