import React, { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const SourceInformation = ({themeicon}) => {
  const [referralEmployeeName, setReferralEmployeeName] = useState('');
  const [referralEmployeeID, setReferralEmployeeID] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Referral Employee Name:', referralEmployeeName);
    console.log('Referral Employee ID:', referralEmployeeID);
  };

 // <--------------- theme for the card -------------------->
// !!! themeicon is a way to change the card and when themeicon is dark that means theme is light and the icon is dark
  
   const [season, setSeason] = useState('');

   const getSeason = () => {
     console.log(themeicon);
     if(themeicon==='dark'){
     const month = new Date().getMonth();
     console.log(month)
     if (month >= 2 && month <= 4) {
       return 'summer'; 
     } else if (month >= 5 && month <= 8) {
       return 'rainy'; 
     } else if (month >= 9 && month <= 10) {
       return 'autumn'; 
     } else {
       return 'winter'; 
     }
     }
     else{
       return 'dark'
     }
   
   };

   useEffect(() => {
     setSeason(getSeason()); 
   }, [themeicon]);


  const cardClass = `card  ${season} d-flex justify-content-center `;

// <--------------- theme for the card --------------------> 
 
  return (
    // <div className="container d-flex justify-content-center align-items-center min-vh-100">
    //   <ToastContainer />
    //   <form onSubmit={handleSubmit} className="w-100 p-4" style={{ maxWidth: '800px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    //     <h2 className="text-center mb-4">Source Information</h2>
 
    //     <div className="row mb-3">
    //       <div className="col-md-6">
    //         <label htmlFor="referralEmployeeName" className="form-label">Referral Employee Name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="referralEmployeeName"
    //           value={referralEmployeeName}
    //           onChange={(e) => setReferralEmployeeName(e.target.value)}
    //           style={{ color: 'black' }}
    //         />
    //       </div>
    //       <div className="col-md-6">
    //         <label htmlFor="referralEmployeeID" className="form-label">Referral Employee ID</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="referralEmployeeID"
    //           value={referralEmployeeID}
    //           onChange={(e) => setReferralEmployeeID(e.target.value)}
    //           style={{ color: 'black' }}
    //         />
    //       </div>
    //     </div>
 
    //     <div className="row">
    //       <div className="col-md-12">
    //         <button type="submit" className="btn btn-primary w-100">Submit</button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    <div className={cardClass}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-100 p-4" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">Source Information</h2>
 
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="referralEmployeeName" className="form-label">Referral Employee Name</label>
            
            <input
              type="text"
              className="form-control"
              id="referralEmployeeName"
              value={referralEmployeeName}
              onChange={(e) => setReferralEmployeeName(e.target.value)}
              style={{ color: 'black' }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="referralEmployeeID" className="form-label">Referral Employee ID</label>
            <input
              type="text"
              className="form-control"
              id="referralEmployeeID"
              value={referralEmployeeID}
              onChange={(e) => setReferralEmployeeID(e.target.value)}
              style={{ color: 'black' }}
            />
          </div>
        </div>
 
        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};
 
export default SourceInformation;