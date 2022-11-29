import React, { useEffect, useState } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { updateUser } from '../services/user.service';
import { getUserRolesByUsername } from '../services/user.service';
import { Radio, RadioGroup } from "@mui/material";

export default function UpdateUserPopupComponent(props) {
    const { onClose, selectedValue, openPopup, oldUsername } = props;
    const [username, setUsername] = useState(props.data.username)
    const [email, setEmail] = useState(props.data.mail)
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState(props.data.address)
    const [userRoles, setUserRoles] = useState()
    const [myrole, setMyrole] = useState(props.data.myrole)

    const handleChange = (event) => {
        setMyrole(event.target.value)
      };
    const handleClosePopup = () => {
      onClose(selectedValue);
    };

    useEffect(()=>{
        console.log(props.data)
        getUserRolesByUsername(oldUsername).then(function(data){setUserRoles(data)})
    },[])

    useEffect(()=>{
        console.log(userRoles)
    }, [userRoles])

    const handleUpdate = () => {
     
        const newUserData = {
            "username": username,
            "mail": email,
            "address": address,
            "password": password,
            "myrole": myrole
        }
        updateUser(oldUsername, newUserData)
        handleClosePopup()
    }
    
    return (
      <Dialog onClose={handleClosePopup} open={openPopup}>
        <DialogTitle>Update User Details</DialogTitle>
        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "80%"
            }}>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField value={username}  size="small" onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" fullWidth margin="normal"/>
                    <TextField value={email} size="small" onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" fullWidth margin="normal"/>
                    <TextField value={address}  size="small" onChange={(e) => setAddress(e.target.value)} id="outlined-basic" label="Address" variant="outlined" fullWidth margin="normal"/>
                    
                    <TextField type="password" placeholder='Enter a new password'  size="small" onChange={(e) => setPassword(e.target.value)} id="outlined-basic" required variant="outlined" fullWidth margin="normal"/>
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                </Box>

            </Box>
            <FormControl
            required
            component="fieldset"
            sx={{ width: "50%" }}
            variant="standard"
        >
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup  onChange={handleChange} defaultValue={props.data.myrole=="ADMIN" ? "ROLE_ADMIN" : "ROLE_USER"}>

            <FormControlLabel value="ROLE_ADMIN" control={<Radio />} label="ADMIN" />
    <FormControlLabel value="ROLE_USER" control={<Radio />} label="USER" />
            </RadioGroup>
              
            
          
        </FormControl>
        </Container> 
        
        {/* onClick={handleClick} */}
        <Button variant="contained" type="button" onClick={handleUpdate} sx={{mt: 2}} fullWidth >Confirm</Button>
      </Dialog>
    );
  }
  
  UpdateUserPopupComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };   
