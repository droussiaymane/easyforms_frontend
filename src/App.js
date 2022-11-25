import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { UserLoginPage } from './pages/UserLoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import PrivateRoute from './components/PrivateRoute';
import FormBuilder from './components/FormBuilder';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <TopBarComponent /> */}
        <Routes>
          <Route path="/user" element={<UserLoginPage />} />
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/userDashboard" 
                 element={
                      <UserDashboardPage />  
                    }/>
          <Route path="/adminDashboard" 
                 element={
                      <AdminDashboardPage />  
                    }/>
           <Route path="/createform" 
                 element={
                      <FormBuilder />  
                    }/>
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
