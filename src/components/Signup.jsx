import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
// import "bootstrap/dist/css/bootstrap.min.css";
 
const Register = () => {
  const [form, setForm] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });
 
  const [currentStep, setCurrentStep] = useState(1);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.Password !== form.ConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log('Form submission response:', result);
      alert("Form submitted successfully");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
 
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
 
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };
 
  return (
    <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container" style={{    
        display: 'flex',
        justifyContent : 'center'}}>
        <div className="row justify-content-center">
          <div className="col-sm align-self-center">
            <div className="logo d-flex justify-content-center">
              <img src={logo} alt="logo" style={{ height: "100px", width: "165px" }}/>
            </div>
            <div className="card" style={{width: '24rem' }}>
              <div className="card-title">
              <h5 className="  text-center mb-4">Login</h5>
              </div>
            
            
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <>
                    <div className="form-group mb-3">
                      <label htmlFor="FirstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="FirstName"
                        name="FirstName"
                        value={form.FirstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="MiddleName">Middle Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="MiddleName"
                        name="MiddleName"
                        value={form.MiddleName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="LastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="LastName"
                        name="LastName"
                        value={form.LastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                    <Link to={"/*"}>
                    <button type="button" className="btn btn-primary">
                        Login
                    </button>
                    </Link>
                    <button type="button" className="btn btn-secondary" onClick={nextStep}>
                      Next
                    </button>
                   </div>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <div className="form-group mb-3">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        name="Email"
                        value={form.Email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="Password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="Password"
                        name="Password"
                        value={form.Password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="ConfirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        value={form.ConfirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-secondary" onClick={previousStep}>
                        Previous
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
            <br />
            <div className="d-flex justify-content-between">
            <Link to={"/Forms"}><button  className="btn btn-primary">Forms</button></Link>
            <Link to={"/Overview"}><button  className="btn btn-primary">Overview</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Register;