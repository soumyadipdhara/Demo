

// import React, { useState } from "react";
// import axios from "axios";
// import { Modal, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import DocumentMaster from "../forms/DocumentMaster";
// import { toast } from "react-toastify";

// const PreboardingForm = () => {
//   const [formData, setFormData] = useState({
//     FirstName: "",
//     MiddleName: "",
//     LastName: "",
//     DOB: "",
//     citizenship: "",
//     marksheet: false,
//     passport: false,
//     PreOnBoardingID: 1005,
//     Email: "ABC@gmail.com",
//     AadharNo: "",
//         PanNo: "",
//         PassportNo: "",
//         TenMarksheetNo: ""
//   });
//   const [showDocumentMaster, setShowDocumentMaster] = useState(false);
//   const [documentType, setDocumentType] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleDocumentUpload = (type) => {
//     setFormData({
//       ...formData,
//       [type.toLowerCase()]: true,
//     });
//   };

//   const handleCheckboxChange = (type) => {
//     setDocumentType(type);
//     setShowDocumentMaster(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.citizenship === "Indian" && !formData.marksheet) {
//       toast.error("10th Marksheet is required for Indian citizenship.");
//       return;
//     }
//     if (formData.citizenship === "NRI" && !formData.passport) {
//       toast.error("Passport is required for NRI citizenship.");
//       return;
//     }

//     const uploadData = {
//       FirstName: formData.FirstName,
//       MiddleName: formData.MiddleName,
//       LastName: formData.LastName,
//       DOB: formData.DOB,
//       PreOnBoardingID: formData.PreOnBoardingID,
//       Email: formData.Email,
//       AadharNo : formData.AadharNo,
//       PanNo : formData.PanNo,
//       PassportNo : formData.PassportNo,
//       TenMarksheetNo : formData.TenMarksheetNo
//     };

//     try {
//       const response = await axios.post(
//         "http://192.168.7.187:3000/PreBoardings/add",
//         uploadData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Upload Successful:", response.data);
//       toast.success("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("There was an error submitting the form.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="pre-card">
//         <div className="card-body">
//           <legend className="card-title mb-4">Pre-Onboarding Form</legend>
//           <form onSubmit={handleSubmit}>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label htmlFor="FirstName" className="form-label">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Your First Name"
//                   className="form-control"
//                   id="FirstName"
//                   name="FirstName"
//                   value={formData.FirstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label htmlFor="MiddleName" className="form-label">
//                   Middle Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your Middle Name"
//                   className="form-control"
//                   id="MiddleName"
//                   name="MiddleName"
//                   value={formData.MiddleName}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label htmlFor="LastName" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your Last Name"
//                   className="form-control"
//                   id="LastName"
//                   name="LastName"
//                   value={formData.LastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label htmlFor="DOB" className="form-label">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="Enter Your Date of Birth"
//                   className="form-control"
//                   id="DOB"
//                   name="DOB"
//                   value={formData.DOB}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">Citizenship</label>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     id="indian"
//                     name="citizenship"
//                     value="Indian"
//                     checked={formData.citizenship === "Indian"}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="indian">
//                     Indian
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     id="nri"
//                     name="citizenship"
//                     value="NRI"
//                     checked={formData.citizenship === "NRI"}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="nri">
//                     Non Resident Of India
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="DocUpload">
//               <p>Documents Upload</p>
//               <div className="mb-3">
//                 <Button
//                   variant="primary"
//                   onClick={() => handleCheckboxChange("Aadhar")}
//                 >
//                   Upload Aadhar
//                 </Button>
//               </div>
//               <div className="mb-3">
//                 <Button
                  
//                   onClick={() => handleCheckboxChange("PAN")}
//                 >
//                   Upload PAN
//                 </Button>
//               </div>
//               {formData.citizenship === "Indian" && (
//                 <div className="mb-3">
//                   <Button
                   
//                     onClick={() => handleCheckboxChange("Marksheet")}
//                   >
//                     Upload 10th Marksheet
//                   </Button>
//                 </div>
//               )}
//               {formData.citizenship === "NRI" && (
//                 <div className="mb-3">
//                   <Button
                
//                     onClick={() => handleCheckboxChange("Passport")}
//                   >
//                     Upload Passport
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <button type="submit" className="btn btn-success">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

//       <Modal
//         show={showDocumentMaster}
//         onHide={() => setShowDocumentMaster(false)}
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Upload {documentType}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <DocumentMaster
//             documentType={documentType}
//             onDocumentUpload={handleDocumentUpload}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowDocumentMaster(false)}
//           >
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default PreboardingForm;


import React from 'react';
import { TextField, Grid, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { color } from 'framer-motion';


const JoiningForm = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    middleName: '',
    lastName: '',
    workedWithGyanSys: false,
    lastEmploymentDetails: '',
    gender: '',
    birthCountry: '',
    bloodGroup: '',
    birthPlace: '',
    maritalStatus: '',
    dateOfBirth: null,
    birthState: '',
    nationality: '',
    fatherSpouseName: '',
    dateOfJoining: null,
    designationBand: '',
    employeeRelation: '',
    passportNumber: '',
    passportIssuePlace: '',
    passportIssueDate: null,
    passportExpiryDate: null,
    panDetails: '',
    aadharNumber: '',
    onsiteExperience: false,
    onsiteDuration: '',
    visaType: '',
    visaCountry: '',
    permanentAddress1: '',
    permanentAddress2: '',
    permanentCity: '',
    permanentState: '',
    permanentCountry: '',
    permanentPinCode: '',
    permanentMobile: '',
    permanentLandLine: '',
    mailingAddress1: '',
    mailingAddress2: '',
    mailingCity: '',
    mailingState: '',
    mailingCountry: '',
    mailingPinCode: '',
    mailingMobile: '',
    mailingLandLine: '',
    personalEmail1: '',
    personalEmail2: '',
    emergencyContact1: '',
    emergencyContact2: '',
    emergencyName1: '',
    emergencyName2: '',
    emergencyRelation1: '',
    emergencyRelation2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2  , color :'white'}}>
      <Typography variant="h4" gutterBottom>
        Application for Employment
      </Typography>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={2} sx={{color:'white'}}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.workedWithGyanSys}
                  onChange={handleCheckboxChange}
                  name="workedWithGyanSys"
                />
              }
              label="Have you worked with GyanSys before?"
            />
            {formData.workedWithGyanSys && (
              <TextField
                fullWidth
                label="Last Employment Details"
                name="lastEmploymentDetails"
                value={formData.lastEmploymentDetails}
                onChange={handleChange}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birth Country"
              name="birthCountry"
              value={formData.birthCountry}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birth Place"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Marital Status</InputLabel>
              <Select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date of Birth"
    value={formData.dateOfBirth}
    onChange={(date) => handleDateChange('dateOfBirth', date)}
    renderInput={(params) => <TextField fullWidth {...params} />}
    required
  />
</LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birth State"
              name="birthState"
              value={formData.birthState}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Father/Spouse Name"
              name="fatherSpouseName"
              value={formData.fatherSpouseName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date of Birth"
    value={formData.dateOfBirth}
    onChange={(date) => handleDateChange('dateOfBirth', date)}
    renderInput={(params) => <TextField fullWidth {...params} />}
    required
  />
</LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation and Band"
              name="designationBand"
              value={formData.designationBand}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Employee Relation</InputLabel>
              <Select
                name="employeeRelation"
                value={formData.employeeRelation}
                onChange={handleChange}
              >
                <MenuItem value="regular">Regular Employee</MenuItem>
                <MenuItem value="contract">Contract Employee</MenuItem>
                <MenuItem value="interest">People of Interest</MenuItem>
                <MenuItem value="trainee">Trainee</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Passport Number"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Place of Issue"
              name="passportIssuePlace"
              value={formData.passportIssuePlace}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date of Birth"
    value={formData.dateOfBirth}
    onChange={(date) => handleDateChange('dateOfBirth', date)}
    renderInput={(params) => <TextField fullWidth {...params} />}
    required
  />
</LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date of Birth"
    value={formData.dateOfBirth}
    onChange={(date) => handleDateChange('dateOfBirth', date)}
    renderInput={(params) => <TextField fullWidth {...params} />}
    required
  />
</LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PAN Details"
              name="panDetails"
              value={formData.panDetails}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aadhar Number"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.onsiteExperience}
                  onChange={handleCheckboxChange}
                  name="onsiteExperience"
                />
              }
              label="Onsite Experience"
            />
            {formData.onsiteExperience && (
              <TextField
                fullWidth
                label="Duration of Onsite Assignment"
                name="onsiteDuration"
                value={formData.onsiteDuration}
                onChange={handleChange}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Visa Type"
              name="visaType"
              value={formData.visaType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Visa Country"
              name="visaCountry"
              value={formData.visaCountry}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent Address 1"
              name="permanentAddress1"
              value={formData.permanentAddress1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent Address 2"
              name="permanentAddress2"
              value={formData.permanentAddress2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent City"
              name="permanentCity"
              value={formData.permanentCity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent State"
              name="permanentState"
              value={formData.permanentState}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent Country"
              name="permanentCountry"
              value={formData.permanentCountry}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent Pin Code"
              name="permanentPinCode"
              value={formData.permanentPinCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent Mobile"
              name="permanentMobile"
              value={formData.permanentMobile}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permanent Land Line"
              name="permanentLandLine"
              value={formData.permanentLandLine}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing Address 1"
              name="mailingAddress1"
              value={formData.mailingAddress1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing Address 2"
              name="mailingAddress2"
              value={formData.mailingAddress2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing City"
              name="mailingCity"
              value={formData.mailingCity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing State"
              name="mailingState"
              value={formData.mailingState}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing Country"
              name="mailingCountry"
              value={formData.mailingCountry}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing Pin Code"
              name="mailingPinCode"
              value={formData.mailingPinCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing Mobile"
              name="mailingMobile"
              value={formData.mailingMobile}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mailing Land Line"
              name="mailingLandLine"
              value={formData.mailingLandLine}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Personal Email 1"
              name="personalEmail1"
              value={formData.personalEmail1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Personal Email 2"
              name="personalEmail2"
              value={formData.personalEmail2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Contact 1"
              name="emergencyContact1"
              value={formData.emergencyContact1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Contact 2"
              name="emergencyContact2"
              value={formData.emergencyContact2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Name 1"
              name="emergencyName1"
              value={formData.emergencyName1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Name 2"
              name="emergencyName2"
              value={formData.emergencyName2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Relation 1"
              name="emergencyRelation1"
              value={formData.emergencyRelation1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Relation 2"
              name="emergencyRelation2"
              value={formData.emergencyRelation2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default JoiningForm;
