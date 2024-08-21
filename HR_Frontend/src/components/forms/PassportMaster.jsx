import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Popup.css';
import { Tab } from 'bootstrap';
const PassportMaster = () => {
  const [form, setForm] = useState({
    PassportNumber : '',
    PassportDOB  : '',
    PassportGender : '',
    PassportPlaceOfBirth :'',
    PassportIssueDate :'',
    PassportExpiry :'',
    PassportIssuedAt :'',
    CreatedBy :0,
    CreatedDate:'',
    UpdatedBy :0,
    UpdatedDate:''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [flag,setFlag]=useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
 
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };
 
  const handleCheckbox = (e) => {
    if(e.target.checked){
      setFlag(1);
    }
   else
   {
    setFlag(0);
   }
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();        
    try
    {            
      const response = await fetch('http://localhost:3000/dummy', 
        {                
          method:'POST',                
          headers: {                    
            'Content-Type':'application/json',      
          },              
          body:JSON.stringify(form),            
        });          
      const result = await response.json();
      console.log('Form submission response:', result);
      alert("form submited sucessfully");
    }
    
    catch (error) { console.error('Error submitting form:', error); } 
  };

  return (
    <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
    <h2>Passport</h2>
    <form className="form"  onSubmit={handleSubmit}>
    {currentStep === 1 && (
    <>
    <div className="label">
          <label htmlFor="PassportNumber">Passport Number :</label><br></br>
          <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
          <input type="text" className={`form-control `}
            id="PassportNumber" name="PassportNumber" required
            value={form.PassportNumber}
            onChange={handleChange}
          /> 
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="PassportIssueDate">Passport IssueDate:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="date" className="form-control"
              id="PassportIssueDate" name="PassportIssueDate" value={form.PassportIssueDate} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="PassportExpiry">Passport Expiry:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="date" className="form-control"
              id="PassportExpiry" name="PassportExpiry" value={form.PassportExpiry} onChange={handleChange} required="true" />
        </div>
        </div>
        <button type="button" className="btn btn-secondary w-100" onClick={nextStep}>
        Next
        </button>
        </>
        )}
        {currentStep === 2 && (
        <>
        <div className="mb-3">
            <label htmlFor="PassportDOB">DOB in Passport:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="date" className="form-control"
              id="PassportDOB" name="PassportDOB" value={form.PassportDOB} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="PassportGender">Gender :</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date"id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="text" className="form-control"
              id="PassportGender" name="PassportGender" value={form.PassportGender} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="PassportPlaceOfBirth">Place of Birth in Passport :</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="PassportPlaceOfBirth" className="form-control"
              id="PassportPlaceOfBirth" name="PassportPlaceOfBirth" value={form.PassportPlaceOfBirth} onChange={handleChange} required="true" />
        </div>
        
        </div>
        <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={previousStep}>Previous</button>
            <button type="button" className="btn btn-secondary" onClick={nextStep}>Next</button>
        </div>
        
        </>
        )}

        {currentStep === 3 && (<>
        <div className="mb-3">
            <label htmlFor="PassportIssuedAt">Passport Issued At:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="text" className="form-control"
              id="PassportIssuedAt" name="PassportIssuedAt" value={form.PassportIssuedAt} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="FatherName">Father Name:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="FatherName" className="form-control"
              id="FatherName" name="FatherName" value={form.FatherName} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="MotherName">Mother Name:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="MotherName" className="form-control"
              id="MotherName" name="MotherName" value={form.MotherName} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={previousStep}>Previous</button>
        <button type="button" className="btn btn-secondary" onClick={nextStep}>Next</button>
        </div>
        </>
      )}
      {currentStep === 4 && (<>
        <div className="mb-3">
            <label htmlFor="LegalGuardianName">Legal Guardian Name</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="text" className="form-control"
              id="LegalGuardianName" name="LegalGuardianName" value={form.LegalGuardianName} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="SpouseName">Spouse Name:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="SpouseName" className="form-control"
              id="SpouseName" name="SpouseName" value={form.SpouseName} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="Address">Address:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="Address" className="form-control"
              id="Address" name="Address" value={form.Address} onChange={handleChange} required="true" />
        </div>
        </div>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={previousStep}>Previous</button>
        <button type="button" className="btn btn-secondary" onClick={nextStep}>Next</button>
        </div>
        </>
      )}
      {currentStep === 5 && (<>
        <div className="mb-3">
        <label  htmlFor="oldcheck">
        Do you have an Old Passport ?  
        <input
          type="checkbox"
          name="oldPassport"
          onChange={handleCheckbox}
        />
        </label>
        </div>
        { flag===1&&(<>
          
          <div className="mb-3">
            <label htmlFor="OldPassportNo">Old Passport No</label><br></br>
              <div class="input-group">
            <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="text" className="form-control"
              id="OldPassportNo" name="OldPassportNo" value={form.OldPassportNo} onChange={handleChange} required="true" />
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="OldPassportIssueDate"> OldPassportIssueDate:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="date" className="form-control"
              id="OldPassportIssueDate" name="OldPassportIssueDate" value={form.OldPassportIssueDate} onChange={handleChange} required="true" />
          </div>
        </div>
        <div className="mb-3">
            <label htmlFor="OldPassportIssuedAt">Old Passport Issued At:</label><br></br>
            <div class="input-group">
           <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
             </svg>
           </span>
            <input type="text" className="form-control"
              id="OldPassportIssuedAt" name="OldPassportIssuedAt" value={form.OldPassportIssuedAt} onChange={handleChange} required="true" />
          </div>
        </div>
        </>)}
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={previousStep}>Previous</button>
        <button type="submit" className="btn btn-primary" onClick={nextStep}>Submit</button>
        </div>
        </>
      )}
      </form>
      </div>
      </div>
    </div>
  </div>
   
  );
};

export default PassportMaster;
