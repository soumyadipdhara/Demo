import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const PreviousWorkRelatedDetails = ({ themeicon }) => {
  const [companyEntries, setCompanyEntries] = useState([
    {
      previouslyWorkedInGyanSys: false,
      dateOfJoining: '',
      designationFromOfferLetter: '',
      employeeRelationWithOrganisation: '',
      employeeId: '',
      companyName: '',
      address: '',
      employmentType: '',
      tenure: '',
      designation: '',
      compensationInr: '',
      hrEmail: '',
      hrPhoneNumber: '',
      reportingManagerEmail: '',
      reportingManagerDesignation: '',
      reportingPeriod: '',
      onsiteProjects: '',
      previousOrganizationDocs: '',
    },
  ]);
 
  const [expandedEntries, setExpandedEntries] = useState([true]); // Track expanded state for each entry
 
  const isHR = true; // Set this based on your actual condition
 
  const handleChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedEntries = [...companyEntries];
    updatedEntries[index][name] = type === 'checkbox' ? checked : value;
    setCompanyEntries(updatedEntries);
  };
 
  const handleFileChange = (index, event) => {
    const { name, files } = event.target;
    const updatedEntries = [...companyEntries];
    updatedEntries[index][name] = files[0];
    setCompanyEntries(updatedEntries);
  };
 
  const handleAddCompany = () => {
    setCompanyEntries([
      ...companyEntries,
      {
        previouslyWorkedInGyanSys: false,
        dateOfJoining: '',
        designationFromOfferLetter: '',
        employeeRelationWithOrganisation: '',
        employeeId: '',
        companyName: '',
        address: '',
        employmentType: '',
        tenure: '',
        designation: '',
        compensationInr: '',
        hrEmail: '',
        hrPhoneNumber: '',
        reportingManagerEmail: '',
        reportingManagerDesignation: '',
        reportingPeriod: '',
        onsiteProjects: '',
        previousOrganizationDocs: '',
      },
    ]);
    setExpandedEntries([...expandedEntries, true]); // Add a new entry for expanded state
  };
 
  const handleDeleteCompany = (index) => {
    const updatedEntries = companyEntries.filter((_, i) => i !== index);
    const updatedExpandedEntries = expandedEntries.filter((_, i) => i !== index);
    setCompanyEntries(updatedEntries);
    setExpandedEntries(updatedExpandedEntries);
  };
 
  const handleToggleExpand = (index) => {
    const updatedExpandedEntries = [...expandedEntries];
    updatedExpandedEntries[index] = !updatedExpandedEntries[index]; // Toggle the expanded state
    setExpandedEntries(updatedExpandedEntries);
  };
 
  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedEntries = [...companyEntries];
      [updatedEntries[index], updatedEntries[index - 1]] = [updatedEntries[index - 1], updatedEntries[index]];
      setCompanyEntries(updatedEntries);
 
      // Move the expanded state along with the entry
      const updatedExpandedEntries = [...expandedEntries];
      [updatedExpandedEntries[index], updatedExpandedEntries[index - 1]] = [updatedExpandedEntries[index - 1], updatedExpandedEntries[index]];
      setExpandedEntries(updatedExpandedEntries);
    }
  };
 
  const handleMoveDown = (index) => {
    if (index < companyEntries.length - 1) {
      const updatedEntries = [...companyEntries];
      [updatedEntries[index], updatedEntries[index + 1]] = [updatedEntries[index + 1], updatedEntries[index]];
      setCompanyEntries(updatedEntries);
 
      // Move the expanded state along with the entry
      const updatedExpandedEntries = [...expandedEntries];
      [updatedExpandedEntries[index], updatedExpandedEntries[index + 1]] = [updatedExpandedEntries[index + 1], updatedExpandedEntries[index]];
      setExpandedEntries(updatedExpandedEntries);
    }
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic here
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
  
 
const cardClass = `card  ${season}`;

 // <--------------- theme for the card --------------------> 
  

  return (
    <div className={cardClass}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-100 p-4" style={{ maxWidth: '800px', }}>
        <h4 className="text-center mb-4"> Enter Your Previous Work Related Details</h4>
 
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Previously worked in GyanSys</label>
            <input
              type="checkbox"
              className="form-check-input"
              name="previouslyWorkedInGyanSys"
              checked={companyEntries[0].previouslyWorkedInGyanSys}
              onChange={(e) => handleChange(0, e)}
            />
          </div>
        </div>
 
        {companyEntries[0].previouslyWorkedInGyanSys && (
          <>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="dateOfJoining" className="form-label">Date of Joining <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfJoining"
                  value={companyEntries[0].dateOfJoining}
                  onChange={(e) => handleChange(0, e)}
                  readOnly={!isHR}
                  style={{ color: 'black' }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="designationFromOfferLetter" className="form-label">Designation (From Offer Letter)<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="designationFromOfferLetter"
                  value={companyEntries[0].designationFromOfferLetter}
                  onChange={(e) => handleChange(0, e)}
                  style={{ color: 'black' }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="employeeRelationWithOrganisation" className="form-label">Employee Relation with Organisation<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeRelationWithOrganisation"
                  value={companyEntries[0].employeeRelationWithOrganisation}
                  onChange={(e) => handleChange(0, e)}
                  readOnly={!isHR}
                  style={{ color: 'black' }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="employeeId" className="form-label">Employee ID<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeId"
                  value={companyEntries[0].employeeId}
                  onChange={(e) => handleChange(0, e)}
                  readOnly={!isHR}
                  style={{ color: 'black' }}
                />
              </div>
            </div>
          </>
        )}
 
        <h4 className="text-center mt-4 mb-3">Employment Details (as per Recent Company)</h4>
 
        {companyEntries.map((currentCompany, index) => (
          <div key={index}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 onClick={() => handleToggleExpand(index)} style={{ cursor: 'pointer' }}>
                Company {index + 1} {expandedEntries[index] ? '▲' : '▼'}
              </h4>
              <div>
                {index >= 0 && (
                  <button
                  type="button" className='btn btn-warning mx-1' onClick={() =>handleMoveUp(index)} style={{width:'50px',height:'50px',padding:0}}>↑</button>
                )}
                {index <= companyEntries.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-warning mx-1"
                    onClick={() => handleMoveDown(index)}
                    style={{ width: '50px', height: '50px', padding: 0 }}
                  >
                    ↓
                  </button>
                )}
             
              {index >= 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteCompany(index)}
                  style={{ width: '50px', height: '50px', padding: 0 }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
              </div>
            </div>
            {expandedEntries[index] && ( // Show fields only if the entry is expanded
              <div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="companyName" className="form-label">Company Name<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      value={currentCompany.companyName}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label">Address<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={currentCompany.address}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
 
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="employmentType" className="form-label">Employment Type<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="employmentType"
                      name="employmentType"
                      value={currentCompany.employmentType}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="tenure" className="form-label">Tenure<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="tenure"
                      name="tenure"
                      value={currentCompany.tenure}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
 
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="designation" className="form-label">Designation<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="designation"
                      name="designation"
                      value={currentCompany.designation}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="compensationInr" className="form-label">Compensation INR<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="compensationInr"
                      name="compensationInr"
                      value={currentCompany.compensationInr}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
 
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="hrEmail" className="form-label">HR Email<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="hrEmail"
                      name="hrEmail"
                      value={currentCompany.hrEmail}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="hrPhoneNumber" className="form-label">HR Phone Number<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="hrPhoneNumber"
                      name="hrPhoneNumber"
                      value={currentCompany.hrPhoneNumber}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
 
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="reportingManagerEmail" className="form-label">Reporting Manager Email<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="reportingManagerEmail"
                      name="reportingManagerEmail"
                      value={currentCompany.reportingManagerEmail}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="reportingManagerDesignation" className="form-label">Reporting Manager Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      id="reportingManagerDesignation"
                      name="reportingManagerDesignation"
                      value={currentCompany.reportingManagerDesignation}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
 
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="reportingPeriod" className="form-label">Reporting Period</label>
                    <input
                      type="text"
                      className="form-control"
                      id="reportingPeriod"
                      name="reportingPeriod"
                      value={currentCompany.reportingPeriod}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="onsiteProjects" className="form-label">Onsite Projects (if any)<span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      id="onsiteProjects"
                      name="onsiteProjects"
                      value={currentCompany.onsiteProjects}
                      onChange={(e) => handleChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
 
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="previousOrganizationDocs" className="form-label">Upload Previous Organization Release Letter<span className="text-danger">*</span></label>
                    <input
                      type="file"
                      className="form-control"
                      id="previousOrganizationDocs"
                      name="previousOrganizationDocs"
                      onChange={(e) => handleFileChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="previousOrganizationDocs" className="form-label">Upload Previous Organization Experience Letter<span className="text-danger">*</span></label>
                    <input
                      type="file"
                      className="form-control"
                      id="previousOrganizationDocs"
                      name="previousOrganizationDocs"
                      onChange={(e) => handleFileChange(index, e)}
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
 
        <div className="row mb-3">
          <div className="col-md-12">
            <button type="button" className="btn btn-secondary mb-3" onClick={handleAddCompany}>Add Another Company</button>
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
 
export default PreviousWorkRelatedDetails;