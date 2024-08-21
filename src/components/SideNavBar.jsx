import "../style.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";


function SideNavBar() {



const location = useLocation();

const pathname = location.pathname;



  return (
    <div className="sidebar ">
      <div className="sidebar-menu col-2">
        <div className="logo">
          <img
            src={logo}
            alt="logo"
            style={{ height: "100px", width: "165px" }}
          />
        </div>
        <Link to={"/Overview"} className={`sidebar-link ${pathname === "/Overview" ? "active" : ""}`}  >
       Overview
        </Link>
        <div>
          <Link to={"/Forms"} className={`sidebar-link ${pathname === "/Forms" ? "active" : ""}`}  >
            Forms
          </Link>
        </div>
        <div>
          <Link to={"/Login"} className={`sidebar-link ${pathname === "/Login" ? "active" : ""}`}  >
            Login
          </Link>
        </div>

        <div>
          <Link to={"/CandidatesList"} className={`sidebar-link ${pathname === "/CandidatesList" ? "active" : ""}`}  >
         PreOnBoarding List
          </Link>
        </div>
        <div>
          <Link to={"/SubmittedForms"} className={`sidebar-link ${pathname === "/SubmittedForms" ? "active" : ""}`}  >
        Submitted Forms
          </Link>
        </div>
        <a href="#settings" className="sidebar-link ">
          Settings
        </a>
        <a href="#account" className="sidebar-link ">
          Account
        </a>
        <a href="#error" className="sidebar-link ">
          Error
        </a>
      </div>
    </div>
  );
}

export default SideNavBar;
