import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JoineeDetails = () => {
  const [form, setForm] = useState({
    JoineeID: 0,
    EmpID: 0,
    Name: '',
    DOJ: '',
    DesignationID: 0,
    GyanSysEMailID: '',
    ContactNumber: '',
    PersonalMailId: '',
    ClientID: 0,
    SkillIDs: [],
    PracticeID: 0,
    PracticeManagerEmdpID: 0,
    AccountDeliveryManagerEmpID: 0,
    TotalWorkExp: 0,
    RelevantExp: 0,
    DOB: '',
    FathersName: '',
    PrevOrg: '',
    BloodGroup: '',
    MaritalStatus: '',
    NPS: false,
    FoodCard: false,
    GMCGPA: false,
    SourceID: 0,
    RecruiterEmpID: 0,
    Gender: '',
    EmploymentTypeID: 0,
    RepliconID: 0,
    ConfirmationDate: '',
    ConfirmedBy: 0,
    Remarks: '',
    HireID: 0,
    Nationality: '',
    CreatedBy: 0,
    CreatedDate: '',
    UpdatedBy: 0,
    UpdatedDate: '',
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
      const response = await fetch('http://localhost:3000/dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log('Form submission response:', result);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="Name">Name:</label> <br />
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                value={form.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="DOJ">Date Of Joining:</label> <br />
              <input
                type="date"
                className="form-control"
                id="DOJ"
                name="DOJ"
                value={form.DOJ}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ContactNumber">Contact Number:</label> <br />
              <input
                type="text"
                className="form-control"
                id="ContactNumber"
                name="ContactNumber"
                value={form.ContactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="PersonalMailId">Personal Mail ID:</label> <br />
              <input
                type="text"
                className="form-control"
                id="PersonalMailId"
                name="PersonalMailId"
                value={form.PersonalMailId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TotalWorkExp">Total Work Experience:</label> <br />
              <input
                type="text"
                className="form-control"
                id="TotalWorkExp"
                name="TotalWorkExp"
                value={form.TotalWorkExp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="RelevantExp">Relevant Work Experience:</label> <br />
              <input
                type="text"
                className="form-control"
                id="RelevantExp"
                name="RelevantExp"
                value={form.RelevantExp}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="DOB">DOB:</label> <br />
              <input
                type="date"
                className="form-control"
                id="DOB"
                name="DOB"
                value={form.DOB}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="FathersName">Father's Name:</label> <br />
              <input
                type="text"
                className="form-control"
                id="FathersName"
                name="FathersName"
                value={form.FathersName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="PrevOrg">Previous Organization:</label> <br />
              <input
                type="text"
                className="form-control"
                id="PrevOrg"
                name="PrevOrg"
                value={form.PrevOrg}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="BloodGroup">Blood Group:</label> <br />
              <input
                type="text"
                className="form-control"
                id="BloodGroup"
                name="BloodGroup"
                value={form.BloodGroup}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="MaritalStatus">Marital Status:</label> <br />
              <input
                type="text"
                className="form-control"
                id="MaritalStatus"
                name="MaritalStatus"
                value={form.MaritalStatus}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Gender">Gender:</label> <br />
              <select
                className="form-control"
                id="Gender"
                name="Gender"
                value={form.Gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="Nationality">Nationality:</label> <br />
              <select
                className="form-control"
                id="Nationality"
                name="Nationality"
                value={form.Nationality}
                onChange={handleChange}
                required
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="Non-Indian">Non-Indian</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Remarks">Remarks:</label> <br />
              <input
                type="text"
                className="form-control"
                id="Remarks"
                name="Remarks"
                value={form.Remarks}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="HireID">Hire ID:</label> <br />
              <input
                type="text"
                className="form-control"
                id="HireID"
                name="HireID"
                value={form.HireID}
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2>Joinee Form</h2>
            <form className="form" onSubmit={handleSubmit}>
              {renderStep()}
              <div className="d-flex justify-content-between mt-3">
                {currentStep > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={previousStep}>
                    Previous
                  </button>
                )}
                {currentStep < 5 && (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Next
                  </button>
                )}
                {currentStep === 5 && (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoineeDetails;
