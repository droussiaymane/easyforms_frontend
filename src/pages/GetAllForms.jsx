import React, { useEffect } from 'react'
import { TopBarComponent } from '../components/TopBarComponent'
import FormsTableComponent from '../components/FormsTableComponent'
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
const GetAllForms = () => {
  const navigate = useNavigate();
   
    useEffect(()=>{
        const islogged=authService.islogged()

        if(!islogged){
            authService.logout()
            navigate("/")
        }

    })
  return (
    
         <>
            <TopBarComponent />
            <br />
<FormsTableComponent/>        </>
  
  )
}

export default GetAllForms