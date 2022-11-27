import React, { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { green, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Message from "./Message";

import AuthService from "../services/auth.service";
import axios from "axios";

export default function SignInComponent({globalRole}) {
 
    const [showError,setShowError]=useState(false);
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [message,setMessage]=useState(" Error ! Try again...")
    const navigate = useNavigate();
    async function loginUser(){
        AuthService.login(mail,password)
.then(()=>{
    navigate("/AdminDashboard")
    
})
.catch((error)=>{
  setShowError(true);
  setMessage(error.response.data.exception)
  console.log(error);
})
      }
    
    return (
        <Container>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LoginOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In {globalRole} 
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField onChange={(e) => setMail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" fullWidth margin="normal"/>
                    <TextField type="password" onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth margin="normal"/>
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                    <Button variant="contained" sx={{mt: 2}} fullWidth onClick={loginUser} >Sign In</Button>
                </Box>
<div style={{paddingTop:'10px'}}>
{showError && (<Message color="red" message={message}/>)}

</div>
            </Box>

        </Container>
        
    )
}