import React, { useEffect, useState } from 'react'
import { TopBarComponent } from '../components/TopBarComponent'
import { getUserByEmail, getUsername, updateUser, updateUserByEmail } from '../services/user.service';
import Joi from 'joi-browser';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import Message from '../components/Message';

const Settings = () => {
    const navigate=useNavigate();
    let email=getUsername();
    const [showError,setShowError]=useState(false);

    const [message,setMessage]=useState(" Error ! Try again...")
    const [user, setUser] = useState({
        name:"",
        username:"",
        mail: "",
       password:"",
       address:""});

     function  handleSave(event){
        let userData = { ...user };
        userData[event.target.name] = event.target.value;
        setUser(userData);
        console.log(user)
     }
     function  validateForm(){
       updateUserByEmail(email,user).then(res=>{ authService.logout();
        navigate("/");}).catch(err=>{clearState();
        setShowError(true)
        })
     }
     const clearState = () => {
        setUser({ 
            name:"",
            username:"",
            mail: "",
           password:"",
           address:""
        
        });
      };
    
    useEffect(()=>{
        const islogged=authService.islogged()

        if(!islogged){
            authService.logout()
            navigate("/")
        }
            getUserByEmail(email).then(res=>setUser(res.data)).catch(err=>console.log(err))
    },[])
  return (

          <>
            <TopBarComponent />
            <br />
            <div class="container mt-5">
    <div class="row">
        <div class="col-lg-4 pb-5">
            <div class="author-card pb-3">
                <div class="author-card-profile">
                    <div class="author-card-avatar">
                    <span class="avatar avatar-96 bg-secondary text-white rounded-2">{email && (email.charAt(0))}</span>

                    </div>
                    <div class="author-card-details">
                        <h5 class="author-card-name text-lg">{email}</h5><span class="author-card-position">{user.latestUpdate && (`latest update ${user.latestUpdate}`)}</span>
                    </div>
                </div>
            </div>
            <div class="wizard">
                <nav class="list-group list-group-flush">
                  <a class="list-group-item active" href="#"><i class="fe-icon-user text-muted"></i>Profile Settings</a>
              
                   
                </nav>
            </div>
        </div>
        <div class="col-lg-8 pb-5">
            <form class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-fn">Name</label>
                        <input class="form-control" type="text" id="account-fn" name="name" value={user.name} onChange={handleSave}required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-fn">Username</label>
                        <input class="form-control"  type="text" id="account-fn" name="username" value={user.username} onChange={handleSave} required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-ln">Address</label>
                        <input class="form-control" type="text" id="account-ln" name="address" value={user.address} onChange={handleSave} required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-email">E-mail Address</label>
                        <input class="form-control" type="email" id="account-email" name="mail" value={user.mail} onChange={handleSave} disabled=""/>
                    </div>
                </div>
              
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-pass">New Password</label>
                        <input class="form-control" placeholder='Enter the new password'  type="password" name="password" id="account-pass" onChange={handleSave} required/>
                    </div>
                </div>
               
                <div class="col-12">
                    <hr class="mt-2 mb-3"></hr>
                    <div class="d-flex flex-wrap justify-content-between align-items-center">

                        <button class="btn btn-style-1 btn-primary"   onClick={validateForm} type="button"  data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Update Profile</button>
                    </div>
                    <div style={{paddingTop:'10px'}}>
{showError && (<Message color="red" message={message}/>)}

</div>
                </div>
            </form>
        </div>
    </div>
</div>
        </>

  )
}

export default Settings