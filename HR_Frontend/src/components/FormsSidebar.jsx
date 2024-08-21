import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css"; 

function FormsSidebar({ setActiveForm }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("skills");
  const [themeicon,setThemeicon]=useState("light")

  const handleClick = () => {
    navigate("/");
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setActiveForm(item);
  };

  const handleTheme = () =>{
    
      if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
          document.documentElement.setAttribute('data-bs-theme','light')
          setThemeicon("dark");
      }
      else {
          document.documentElement.setAttribute('data-bs-theme','dark')
          setThemeicon("light");
      }
  
  } ;
 

  return (
    <div className="forms-sidebar col-2">
      <div className="forms-sidebar-menu">
        <div className="icons d-flex justify-content-between"> 
          <span className="back-button">
            <i
              className="fa-solid fa-arrow-right fa-rotate-180"
              onClick={handleClick}
            ></i>
          </span>
          <span>
          {themeicon==="light"&&(
            <>
            <button type="button" class="btn btn-dark" onClick={handleTheme}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-low-fill" viewBox="0 0 16 16">
                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"></path>
                </svg>
              </button>
            </>
          )}
          {themeicon==="dark"&&(
            <>
            <button type="button" class="btn btn-dark" onClick={handleTheme}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"></path>
                  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"></path>
                </svg>
            </button>
            </>
          )}
        </span>
        </div>
        <a
          href="#skills"
          className={`sidebar-link ${activeItem === "skills" ? "active" : ""}`}
          onClick={() => handleItemClick("skills")}
        >
          Skills
        </a>
        <a
          href="#client"
          className={`sidebar-link ${activeItem === "client" ? "active" : ""}`}
          onClick={() => handleItemClick("client")}
        >
          Client
        </a>
        <a
          href="#joinee"
          className={`sidebar-link ${activeItem === "joinee" ? "active" : ""}`}
          onClick={() => handleItemClick("joinee")}
        >
          Joinee
        </a>
        <a
          href="#hire"
          className={`sidebar-link ${activeItem === "hire" ? "active" : ""}`}
          onClick={() => handleItemClick("hire")}
        >
          Hire
        </a>
        <a
          href="#practice"
          className={`sidebar-link ${
            activeItem === "practice" ? "active" : ""
          }`}
          onClick={() => handleItemClick("practice")}
        >
          Practice
        </a>
        <a
          href="#passport"
          className={`sidebar-link ${
            activeItem === "passport" ? "active" : ""
          }`}
          onClick={() => handleItemClick("passport")}
        >
          Passport
        </a>
        <a
          href="#employee"
          className={`sidebar-link ${
            activeItem === "employee" ? "active" : ""
          }`}
          onClick={() => handleItemClick("employee")}
        >
          Employee
        </a>
        <a
          href="#address"
          className={`sidebar-link ${activeItem === "address" ? "active" : ""}`}
          onClick={() => handleItemClick("address")}
        >
          Address
        </a>
        <a
          href="#recruiter"
          className={`sidebar-link ${
            activeItem === "recruiter" ? "active" : ""
          }`}
          onClick={() => handleItemClick("recruiter")}
        >
          Recruiter
        </a>
        <a
          href="#source"
          className={`sidebar-link ${activeItem === "source" ? "active" : ""}`}
          onClick={() => handleItemClick("source")}
        >
          Source
        </a>
        <a
          href="#parking"
          className={`sidebar-link ${activeItem === "parking" ? "active" : ""}`}
          onClick={() => handleItemClick("parking")}
        >
          Parking
        </a>
        <a
          href="#emergencycontact"
          className={`sidebar-link ${
            activeItem === "emergencycontact" ? "active" : ""
          }`}
          onClick={() => handleItemClick("emergencycontact")}
        >
          Emergency Contact
        </a>
        <a
          href="#relationship"
          className={`sidebar-link ${
            activeItem === "relationship" ? "active" : ""
          }`}
          onClick={() => handleItemClick("relationship")}
        >
          Relationship
        </a>
        <a
          href="#designation"
          className={`sidebar-link ${
            activeItem === "designation" ? "active" : ""
          }`}
          onClick={() => handleItemClick("designation")}
        >
          Designation
        </a>
        <a
          href="#insurance"
          className={`sidebar-link ${
            activeItem === "insurance" ? "active" : ""
          }`}
          onClick={() => handleItemClick("insurance")}
        >
          Insurance
        </a>
        <a
          href="#employmenttype"
          className={`sidebar-link ${
            activeItem === "employmenttype" ? "active" : ""
          }`}
          onClick={() => handleItemClick("employmenttype")}
        >
          Employment Type
        </a>
        <a
          href="#linkedin"
          className={`sidebar-link ${
            activeItem === "linkedin" ? "active" : ""
          }`}
          onClick={() => handleItemClick("linkedin")}
        >
          LinkedIn
        </a>
        <a
          href="#replicon"
          className={`sidebar-link ${
            activeItem === "replicon" ? "active" : ""
          }`}
          onClick={() => handleItemClick("replicon")}
        >
          Replicon
        </a>
        <a
          href="#bank"
          className={`sidebar-link ${activeItem === "bank" ? "active" : ""}`}
          onClick={() => handleItemClick("bank")}
        >
          Bank
        </a>
        {/* <a
          href="#BankTran"
          className={`sidebar-link ${activeItem === "BankTran" ? "active" : ""}`}
          onClick={() => handleItemClick("BankTran")}
        >
          BankTran
        </a> */}
        <a
          href="#documents"
          className={`sidebar-link ${
            activeItem === "documents" ? "active" : ""
          }`}
          onClick={() => handleItemClick("documents")}
        >
          Documents
        </a>
        <a
          href="#BankTran"
          className={`sidebar-link ${
            activeItem === "BankTran" ? "active" : ""
          }`}
          onClick={() => handleItemClick("BankTran")}
        >
          BankTran
        </a>
      </div>
    </div>
  );
}

export default FormsSidebar;
