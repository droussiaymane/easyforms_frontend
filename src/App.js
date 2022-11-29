import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { UserLoginPage } from "./pages/UserLoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserDashboardPage } from "./pages/UserDashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import FormViewer from "./pages/FormViewer";
import GetAllForms from "./pages/GetAllForms";
import FormBuilderTop from "./components/FormBuilderTop";
import FormUpdateComponent from "./components/FormUpdateComponent";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import { GetAllUsers } from "./pages/GetAllUsers";
import Settings from "./pages/Settings";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <TopBarComponent /> */}
        <Routes>
          <Route path="/user" element={<UserLoginPage />} />
          <Route path="/getallusers" element={<GetAllUsers />} />
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/userDashboard" element={<UserDashboardPage />} />
          <Route path="/adminDashboard" element={<AdminDashboardPage />} />
          <Route path="/createform" element={<FormBuilderTop />} />
          <Route path="/updateform/:id" element={<FormUpdateComponent />} />
          <Route path="/getform/:id" element={<FormViewer />} />
          <Route path="/getallforms" element={<GetAllForms />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings:option" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
