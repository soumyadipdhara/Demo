import React, { useState, useEffect } from "react";
import SideNavBar from "./components/SideNavBar";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forms from "./components/Forms";
import Overview from "./components/Overview";
import UserLanding from "./components/UserLanding";
// import SignIn from "./pages/SignIn";

import DemoView from "./components/Documentup/Hrspoc";
import SubmittedForms from "./components/SubmittedForms";

import DemoView from "./components/forms/Joinee/Hrspoc";


const App = () => {
  return (
    <div className="row">
      <div className="col-3">
        <SideNavBar />
      </div>

      <div className="col-9">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Submitted" element={SubmittedForms} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/DemoView" element={<DemoView />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
