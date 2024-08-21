import React, { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const SkillsAndCertification = ({themeicon}) => {
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState([{ name: '', document: null }]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Skills:', skills);
    console.log('Certifications:', certifications);
  };
 
  const handleCertificationChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedCertifications = [...certifications];
    if (name === 'document') {
      updatedCertifications[index][name] = files[0];
    } else {
      updatedCertifications[index][name] = value;
    }
    setCertifications(updatedCertifications);
  };
 
  const handleAddCertification = () => {
    setCertifications([...certifications, { name: '', document: null }]);
  };
 
  const handleDeleteCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };
 
  const moveCertificationUp = (index) => {
    if (index > 0) {
      const updatedCertifications = [...certifications];
      [updatedCertifications[index], updatedCertifications[index - 1]] = [updatedCertifications[index - 1], updatedCertifications[index]];
      setCertifications(updatedCertifications);
    }
  };
 
  const moveCertificationDown = (index) => {
    if (index < certifications.length - 1) {
      const updatedCertifications = [...certifications];
      [updatedCertifications[index], updatedCertifications[index + 1]] = [updatedCertifications[index + 1], updatedCertifications[index]];
      setCertifications(updatedCertifications);
    }
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
    <div className={cardClass}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-100 p-4" style={{ maxWidth: '800px', borderRadius: '10px',  marginTop: '20px' }}>
        <h2 className="text-center mb-4">Skills and Certification</h2>
 
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="skills" className="form-label">Skills</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              style={{ color: 'black' }}
            />
          </div>
        </div>
 
       
 
        {certifications.map((cert, index) => (
          <div key={index} className="row mb-3 align-items-end">
            <div className="col-md-4">
              <label htmlFor={`certificationName-${index}`} className="form-label">Certification Name</label>
              <input
                type="text"
                className="form-control"
                id={`certificationName-${index}`}
                name="name"
                value={cert.name}
                onChange={(e) => handleCertificationChange(index, e)}
                style={{ color: 'black' }}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor={`certificationDocument-${index}`} className="form-label">Document Upload</label>
              <input
                type="file"
                className="form-control"
                id={`certificationDocument-${index}`}
                name="document"
                onChange={(e) => handleCertificationChange(index, e)}
                style={{ color: 'black' }}
              />
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <button type="button" className="btn btn-danger me-2" onClick={() => handleDeleteCertification(index)}>
                <i className="bi bi-trash"></i>
              </button>
              <button type="button" className="btn btn-warning me-2" onClick={() => moveCertificationUp(index)}>
                <i className="bi bi-arrow-up"></i>
              </button>
              <button type="button" className="btn btn-warning" onClick={() => moveCertificationDown(index)}>
                <i className="bi bi-arrow-down"></i>
              </button>
            </div>
          </div>
        ))}
 
        <div className="row mb-3">
          <div className="col-md-12">
            <button type="button" className="btn btn-secondary mb-3" onClick={handleAddCertification}>Add Another Certification</button>
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
 
export default SkillsAndCertification;