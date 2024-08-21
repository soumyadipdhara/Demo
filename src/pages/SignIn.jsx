
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../components/context/UserContext';
import login from '../assets/login.svg'
import logo from '../assets/gyansys_logo.png';
import './SignIn.css';
import { jwtDecode } from "jwt-decode";
import ForgotPassword from "../components/ForgotPassword";


const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const[forgotPassword , showForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.7.187:3000/users/login", {
        Email: form.Email,
        Password: form.Password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success('Login Successful');
        const { token } = response.data;
        const decodedToken = jwtDecode(token);  
        const RoleID = decodedToken.RoleID;
        const userData = {
          FirstName:decodedToken.FirstName,
          LastName:decodedToken.LastName,
          UserID: decodedToken.UserID,
          FullName: decodedToken.FullName,
          Email: decodedToken.Email,
          RoleID: decodedToken.RoleID,
          token,
        };
        

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);

        if (RoleID === 1) {
          navigate("/landing");
        } else {
          navigate("/overview");
        }
      } else {
        toast.error("Login failed. Please check your email and password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized: Incorrect email or password.");
      } else {
        toast.error("Login error. Please try again later.");
      }
    }
  };
 const handleFogortPasswordClick = () =>{
  showForgotPassword(true);
 };

 const handleCloseForgotPassword = () =>{
  showForgotPassword(false);
 }
  return (
    <>
    
      <div className="signin-container">
        <div className="globe-container">
          <img src={login} />
        </div>
        <div className="form-container">
          <img src={logo} className="top-left-logo" alt="Gyansys Logo" />
          <div className="signin-box">
            <h5>Login</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="Email">Email Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  required
                  placeholder="Email id"
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
                  placeholder="Password"
                />
              </div>
              <div className="frmbtn">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="forgot-password">
               <a onClick={handleFogortPasswordClick} style={{cursor: 'pointer', color: '#007bff'}}>
                Forgot Password?
               </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ForgotPassword open ={forgotPassword} onClose={handleCloseForgotPassword}/>
      <ToastContainer />
    </>
  );
};

export default SignIn;
