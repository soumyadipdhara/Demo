import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CitySelect, CountrySelect, StateSelect,} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddressMaster = () => {
  const [form, setForm] = useState({
    AddressType: '',
    Address1: '',
    Address2: '',
    Address3: '',
    City: '',
    State: '',
    Country: '',
    PostalCode: '',
    CreatedBy :0,
    CreatedDate:'',
    UpdatedBy :0,
    UpdatedDate:'' 
  });

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const [currentStep, setCurrentStep] = useState(1);
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
      if(response.status===201){
      alert("form submited sucessfully");}
    }
    
    catch (error) { console.error('Error submitting form:', error); } 
  };

  return (
    <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2>Address</h2>
              <form className="form"  onSubmit={handleSubmit}>
                <div className="label">
    {currentStep === 1 && (
    <>
          <div className="mb-3">
            <label htmlFor="AddressType">Address Type:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
              <select className="form-control" name="AddressType" onChange={handleChange} value={form.AddressType}
                id="AddressType" placeholder="select-address-type" required>
                <option value="">Select Address Type</option>
                <option value=" Current">Current</option>
                <option value="Permanent">Permanent</option>    
              </select>
            </div>
          </div>
          <button type="button" className="btn btn-secondary w-100" onClick={nextStep}> Next </button>
        </>
        )}
         {currentStep === 2 && (
        <>
          <div className="mb-3">
            <label htmlFor="Address1">Address 1:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
              <input type="text" className="form-control" 
              id="Address1" name="Address1" value={form.Address1} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Address2">Address 2:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
            <input type="text" className="form-control"
              id="Address2" name="Address2" value={form.Address2} onChange={handleChange} required />
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Address3">Address 3:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
            <input type="text" className="form-control"
              id="Address3" name="Address3" value={form.Address3} onChange={handleChange} required />
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
            <label htmlFor="Country">Country:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
            <CountrySelect onChange={(e) => {
                setCountryid(e.id);
                form.Country=setCountryid;
            }} placeHolder="Select Country"/>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="State">State:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
            <StateSelect countryid={countryid}
                onChange={(e) => {
                setstateid(e.id);
                form.State=setstateid;
                }}
            placeHolder="Select State"/>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="City">City:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
            <CitySelect countryid={countryid} stateid={stateid}
               onChange={(e) => { console.log(e);
                form.City=e;
               }}
            placeHolder="Select City"/>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="PostalCode">Postal Code:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date"id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
              <input type="text" className="form-control"
                id="PostalCode" name="PostalCode" value={form.PostalCode} onChange={handleChange} required minLength="6" maxLength="9" />
            </div>
            </div>
              <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={previousStep}>Previous</button>
              <button type="submit" className="btn btn-primary">Submit</button>
              </div>
              </>
            )}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
 
  );
};

export default AddressMaster;
