import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forms from "./components/Forms";
import Overview from "./components/Overview";
import "bootstrap/dist/css/bootstrap.min.css";
import CandidatesList from "./components/CandidatesList";

import SignIn from "./pages/SignIn";
import PreOnBoarding from "./components/PreOnBoarding/PreOnboardingForm";
import UserLanding from "./components/UserLanding";
import { UserProvider } from "./components/context/UserContext";
import Globe from "./components/Globe";

import PrivateRoute from "./components/routes/PrivateRoute";


// import DemoView from "./components/Documentup/Hrspoc";

import DemoView from "./components/forms/Joinee/Hrspoc"

import JoineePage from "./pages/JoineePage";
import SubmittedForms from "./components/SubmittedForms";
import ViewSubmittedForm from "./components/ViewSubmittedForm";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route element={<PrivateRoute RoleID={[1]} />}>
            <Route path="/landing" element={<UserLanding />} />
          </Route>
          <Route element={<PrivateRoute RoleID={[2]} />}>
            <Route path="/overview" element={<Overview />} />
          </Route>
          <Route path="/SubmittedForms" element={<SubmittedForms />} />
          <Route
            path="/view-submitted-form/:userId"
            element={<ViewSubmittedForm />}
          />
          <Route path="/joineepage" element={<JoineePage />} />
          <Route path="/Landing" element={<UserLanding />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/DemoView" element={<DemoView />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/CandidatesList" element={<CandidatesList />} />
          <Route path="/PreOnBoarding" element={<PreOnBoarding />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
