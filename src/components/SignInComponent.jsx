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
import Joi from 'joi-browser';


import AuthService from "../services/auth.service";
import axios from "axios";

export default function SignInComponent({globalRole}) {
    const [user, setUser] = useState({
      
        email: "",
       password:""
      });
      
      const [errors, setErrors] = useState({});
      const schema = {
    
        email: Joi.string().email().required(),
      password:Joi.string().min(8).required()
      };

      const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(user, 
            schema, { abortEarly: false });
        console.log(result);
        const { error } = result;
        if (!error) {
            loginUser(user.email,user.password)
            clearState()
          return null;
        } else {
          const errorData = {};
          for (let item of error.details) {
            const name = item.path[0];
            const message = item.message;
            errorData[name] = message;
          }
          console.log(errors);
          setErrors(errorData);
          return errorData;
        }
      };
      const handleSave = (event) => {
        const { name, value } = event.target;
        let errorData = { ...errors };
        const errorMessage = validateProperty(event);
        if (errorMessage) {
          errorData[name] = errorMessage;
        } else {
          delete errorData[name];
        }
        let userData = { ...user };
        userData[name] = value;
        setUser(userData);
        setErrors(errorData);
      };

      const validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
      };
      const clearState = () => {
        setUser({ 
          email: "",
         password:""
        });
      };

    const [showError,setShowError]=useState(false);

    const [message,setMessage]=useState(" Error ! Try again...")
    const navigate = useNavigate();
    async function loginUser(mail,password){
        AuthService.login(mail,password)
.then(()=>{
    navigate("/AdminDashboard")
    
})
.catch((error)=>{
  setShowError(true);
  console.log(error.response)
  setMessage(error.response.data.exception)
  console.log(error);
})
      }
    
    return (
        <Container style={{textAlign:'-webkit-center'      }}>
            <Box sx={{
                marginTop: 8,
                width:'40%',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LoginOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In {globalRole} 
                </Typography>
                <Box >
                    <TextField             value={user.email}
 onChange={handleSave} id="outlined-basic"  name="email" label="Email" variant="outlined" fullWidth margin="normal"/>
                    {errors.email && (
          <div className="alert alert-danger">
            {errors.email=='"email" must be a valid email' ? 'Please enter a valid email' : 'Email is required'}
          </div>
        )}
                    <TextField name="password" type="password" value={user.password}
            onChange={handleSave} id="outlined-basic" label="Password" variant="outlined" fullWidth margin="normal"/>
              {errors.password && (
         <div class="alert alert-danger" role="alert">
            {errors.password=='"password" length must be at least 8 characters long' ? 'Password length must be at least 8 characters long' :'Password is required' }
          </div>
        )}
                    <Button variant="contained" sx={{mt: 2}} fullWidth                   type="submit"
      onClick={validateForm} >Sign In</Button>
                </Box>
<div style={{paddingTop:'10px'}}>
{showError && (<Message color="red" message={message}/>)}

</div>
            </Box>

        </Container>
        
    )
}