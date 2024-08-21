import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Popup.css'; // Create and import this CSS file
 
const InsuranceMaster = () => {
  const [form, setForm] = useState({
    InsuranceType: '',
    DependentRelationship1: '',
    DependentName1: '',
    DependentDOB1: '',
    DependentRelationship2: '',
    DependentName2: '',
    DependentDOB2: '',
    DependentRelationship3: '',
    DependentName3: '',
    DependentDOB3: '',
    DependentRelationship4: '',
    DependentName4: '',
    DependentDOB4: '',
    DependentRelationship5: '',
    DependentName5: '',
    DependentDOB5: '',
    DependentRelationship6: '',
    DependentName6: '',
    DependentDOB6: '',
    CreatedBy: 0,
    CreatedDate: '',
    UpdatedBy: 0,
    UpdatedDate: ''
  });
 
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
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.7.187:3000/insurance/insurancetrans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log('Form submission response:', result);
      if (response.status === 201) {
        alert("Form submitted successfully");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
 
  return (
    <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2>Insurance</h2>
            <form className="form" onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <>
                  <div className="label">
                    <label htmlFor="InsuranceType">Insurance Type:</label> <br />
                    <div className="input-group">
                      <span className="input-group-text info-icon" data-tooltip="Enter the insurance type">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                      </span>
                      <select className="form-control" name="InsuranceType" onChange={handleChange} value={form.InsuranceType}
                      id="InsuranceType" placeholder="select-InsuranceType" required>
                      <option value="">Select insurance Type</option>
                      <option value="parental">Parental Insurance</option>
                      <option value="dependent">Dependent</option>
                     
                      
            </select>
                    </div>
                  </div>
                  <br />
                  <button type="button" className="btn btn-secondary w-100" onClick={nextStep}> Next </button>
                </>
              )}
              {currentStep > 1 && currentStep <= 4 && (
                <>
                  {[...Array(3)].map((_, index) => {
                    const num = index + 1;
                    if (currentStep === num + 1) {
                      return (
                        <div key={num} className="border p-3 my-3">
                          <h5>Dependent {num}</h5>
                          <div className="form-group">
                            <label htmlFor={`DependentRelationship${num}`}>Relationship:</label> <br />
                            <div className="input-group">
                              <span className="input-group-text info-icon" data-tooltip="Enter the relationship">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                </svg>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                id={`DependentRelationship${num}`}
                                name={`DependentRelationship${num}`}
                                value={form[`DependentRelationship${num}`]}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor={`DependentName${num}`}>Name:</label> <br />
                            <div className="input-group">
                              <span className="input-group-text info-icon" data-tooltip="Enter the dependent's name">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                </svg>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                id={`DependentName${num}`}
                                name={`DependentName${num}`}
                                value={form[`DependentName${num}`]}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor={`DependentDOB${num}`}>Date of Birth:</label> <br />
                            <div className="input-group">
                              <span className="input-group-text info-icon" data-tooltip="Enter the dependent's date of birth">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                </svg>
                              </span>
                              <input
                                type="date"
                                className="form-control"
                                id={`DependentDOB${num}`}
                                name={`DependentDOB${num}`}
                                value={form[`DependentDOB${num}`]}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary w-100 me-2" onClick={previousStep}>
                      Previous
                    </button>
                    {currentStep<=3&&(
                      <>
                       <button type="button" className="btn btn-secondary w-100 ms-2" onClick={nextStep}>
                       Next
                     </button>
                     </>
                    )}
                     {currentStep>3&&(
                      <>
                       <button type="submit" className="btn btn-primary w-100 ms-2" onClick={nextStep}>
                       Submit
                     </button>
                     </>
                    )}                 
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
 
export default InsuranceMaster;