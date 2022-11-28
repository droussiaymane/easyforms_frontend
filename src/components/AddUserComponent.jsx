import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createUser } from '../services/user.service';
import { Radio, RadioGroup } from "@mui/material";
import Joi from 'joi-browser';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;


  const formErrors= {email: 'Please enter a valid email', password: 'Password is required'};
  const [emailValid, setEmailValid] = useState(false)
    



  const [user, setUser] = useState({
    username:"",
    email: "",
   password:"",
   address:"",
   myrole:"ROLE_USER"
  });
  
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
  password:Joi.string().min(8).required(),
  myrole:Joi.string()
  };

  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(user, 
        schema, { abortEarly: false });
    console.log(result);
    const { error } = result;
    if (!error) {
        handleClick(user)
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
      username:"",
      email: "",
     password:"",
     address:"",
     myrole:"ROLE_USER"
    });
  };

 
  const handleClick = (user) => {
   

    const userData = {
        "username": user.username,
        "mail": user.email,
        "address": user.address,
        "password": user.password,
        "myrole": user.myrole
    }
 

    createUser(userData).then(res=>console.log("created")).catch((err)=>console.log(err))
    handleClose()
  }
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create New User</DialogTitle>
      <Box sx={{ display: 'flex' }}>


        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "80%"
            }}>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField value={user.username} name="username"
 onChange={handleSave} size="small" id="outlined-basic" label="Username" variant="outlined" fullWidth margin="normal"/>
  
                    <TextField value={user.email} name="email"
 onChange={handleSave} size="small"  id="outlined-basic" label="Email" variant="outlined" fullWidth margin="normal"/>
   
                    <TextField value={user.address} name="address"
 onChange={handleSave} size="small"  id="outlined-basic" label="Address" variant="outlined" fullWidth margin="normal"/>
                     
                    <TextField value={user.password} name="password"
 onChange={handleSave} size="small" type="password" size="small" id="outlined-basic" label="Password" variant="outlined" fullWidth margin="normal"/>
  {errors.password && (
          <div className="alert alert-danger">
            {errors.password=='"password" length must be at least 8 characters long' ? 'Password length must be at least 8 characters long' :'Password is required' }
          </div>
        )}
                 {errors.username && (
          <div className="alert alert-danger">
            {errors.username && 'Username is required'}
          </div>
        )}  
         {errors.email && (
                <div className="alert alert-danger">

            {errors.email=='"email" must be a valid email' ? 'Please enter a valid email' : 'Email is required'}
          </div>
        )}      {errors.address && (
          <div className="alert alert-danger">

      {errors.address && 'Address is required'}
    </div>
  )}   {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                </Box>

            </Box>

        </Container>

        <FormControl
            required
            component="fieldset"
            sx={{ width: "50%" }}
            variant="standard"
        >
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup defaultValue={user.myrole} onChange={handleSave} name="myrole">

            <FormControlLabel value="ROLE_ADMIN" control={<Radio />} label="ADMIN" />
    <FormControlLabel value="ROLE_USER" control={<Radio />} label="USER" />
            </RadioGroup>
              
            
          
        </FormControl>
      </Box>
      <Button variant="contained" sx={{mt: 2}} fullWidth  type="submit"
      onClick={validateForm}>Create New User</Button>

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddUserComponent() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create New User
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}