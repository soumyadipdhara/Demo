import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentUpload from '../components/Documentup/DocumentUpload';
import { color } from 'framer-motion';
import SideNavBar from './SideNavBar';
 
const ViewSubmittedForm = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    UserID: 0,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Gender: '',
    BirthCountryID: 0,
    BloodGroup: '',
    MaritalStatus: '',
    DOB: '',
    BirthPlaceCityID: 0,
    BirthStateID: 0,
    Nationality: '',
    FatherName: '',
    SpouseName: '',
    GuardianName: '',
    PanNo: '',
    AadharNo: '',
    OnSiteExperience: true,
    DurationOfOnsiteAssignment: '',
    VisaType: '',
    OnsiteCountryID: '',
    CreatedBy: 0,
    CreatedDate: '',
    UpdatedBy: 0,
    UpdatedDate: '',
    Relation: '',
    fatherGuardianSpouseName: '',
    Comment: '',
  });
  const [isEditable, setIsEditable] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [email, setEmail] = useState('');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.7.187:3000/personaldetails/${userId}`);
        const data = await response.json();
        setEmail(data.User.Email);
        setFormData(data);
 
        let relation = '';
        if (data.FatherName) {
          relation = 'Father';
        } else if (data.SpouseName) {
          relation = 'Spouse';
        } else if (data.GuardianName) {
          relation = 'Guardian';
        }
        setFormData((prevData) => ({
          ...prevData,
          Relation: relation,
          fatherGuardianSpouseName: data[relation + 'Name'],
        }));
        const docResponse = await fetch(`http://192.168.7.187:3000/getDocumentsByUser/${userId}`);
        const docData = await docResponse.json();
        setDocuments(docData);
 
      } catch (error) {
        console.error('Error fetching personal details:', error);
      }
    };
 
    fetchData();
  }, [userId]);
 
 
 
  const handleDurationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      DurationOfOnsiteAssignment: e.target.value
    }));
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
 
  const handleCommentChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Comment: e.target.value,
    }));
  };
 
  const formContainerStyle = {
    maxWidth: '900px',
    flexGrow:1,
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };
 
  const formLabelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color:'black'
  };
 
  const commentBoxStyle = {
    width: '100%',
    height: '150px',
    boxSizing: 'border-box',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  };
 
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  };
 
  const btnPrimaryStyle = {
    background: 'linear-gradient(45deg, #007bff, #0056b3)',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background 0.3s ease, transform 0.3s ease',
  };
 
  const btnPrimaryHoverStyle = {
   
    transform: 'scale(1.05)',
  };
 
  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  };
 
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '250px',
    textAlign: 'center',
  };
 
  const cardTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
 
  const cardLinkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    display: 'block',
    marginTop: '10px',
  };
 
 
 
  return (
    <div className='viewsubmitedform' style={{display :'flex'}}>
    <div className='side-nav col-2'>
      <SideNavBar/>
      </div>
    <div className='main-content col-10' style={formContainerStyle }>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'green' }}>HR SPOC Review for - {email} </h2>
      <form>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="FirstName" style={formLabelStyle}>First Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="FirstName"
              name="FirstName"
              value={formData.FirstName}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="MiddleName" style={formLabelStyle}>Middle Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="MiddleName"
              name="MiddleName"
              value={formData.MiddleName}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="LastName" style={formLabelStyle}>Last Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="LastName"
              name="LastName"
              value={formData.LastName}
              readOnly
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="Gender" style={formLabelStyle}>Gender</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="Gender"
              name="Gender"
              value={formData.Gender}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="BirthCountryID" style={formLabelStyle}>Birth Country</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="BirthCountryID"
              name="BirthCountryID"
              value={formData.BirthCountryID}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="BloodGroup" style={formLabelStyle}>Blood Group</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="BloodGroup"
              name="BloodGroup"
              value={formData.BloodGroup}
              readOnly
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="MaritalStatus" style={formLabelStyle}>Marital Status</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="MaritalStatus"
              name="MaritalStatus"
              value={formData.MaritalStatus}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="DOB" style={formLabelStyle}>Date of Birth</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="DOB"
              name="DOB"
              value={formData.DOB}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="BirthPlaceCityID" style={formLabelStyle}>Birth Place City</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="BirthPlaceCityID"
              name="BirthPlaceCityID"
              value={formData.BirthPlaceCityID}
              readOnly
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="BirthStateID" style={formLabelStyle}>Birth State</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="BirthStateID"
              name="BirthStateID"
              value={formData.BirthStateID}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="Nationality" style={formLabelStyle}>Nationality</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="Nationality"
              name="Nationality"
              value={formData.Nationality}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="PanNo" style={formLabelStyle}>PAN Number</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="PanNo"
              name="PanNo"
              value={formData.PanNo}
              readOnly
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="AadharNo" style={formLabelStyle}>Aadhar Number</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="AadharNo"
              name="AadharNo"
              value={formData.AadharNo}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="OnSiteExperience" style={formLabelStyle}>On-site Experience</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="OnSiteExperience"
              name="OnSiteExperience"
              value={formData.OnSiteExperience ? 'Yes' : 'No'}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="DurationOfOnsiteAssignment" style={formLabelStyle}>Duration of On-site Assignment</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="DurationOfOnsiteAssignment"
              name="DurationOfOnsiteAssignment"
              value={formData.DurationOfOnsiteAssignment}
              readOnly
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="VisaType" style={formLabelStyle}>Visa Type</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="VisaType"
              name="VisaType"
              value={formData.VisaType}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="OnsiteCountryID" style={formLabelStyle}>On-site Country</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="OnsiteCountryID"
              name="OnsiteCountryID"
              value={formData.OnsiteCountryID}
              readOnly
            />
          </div>
        </div>
 
 
        {/* Documents Section */}
        <div style={cardContainerStyle}>
          <h3 style={formLabelStyle}>Documents</h3>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} style={cardStyle}>
                <div style={cardTitleStyle}>{doc.name}</div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" style={cardLinkStyle}>
                  View Document
                </a>
              </div>
            ))
          ) : (
            <p style={formLabelStyle}>No documents available.</p>
          )}
        </div>
        {/* Comment Box */}
        <div>
          <label htmlFor="Comment" style={formLabelStyle}>Comment</label>
          <textarea
            id="Comment"
            name="Comment"
            style={commentBoxStyle}
            value={formData.Comment}
            onChange={handleCommentChange}
          />
        </div>
        <div style={buttonContainerStyle}>
          <button
            type="button"
            style={btnPrimaryStyle}
            onClick={() => alert('Comment saved!')}
            // onMouseOver={(e) => e.target.style = { ...btnPrimaryHoverStyle }}
            // onMouseOut={(e) => e.target.style = btnPrimaryStyle}
          >
            Save Comment
          </button>
        </div>
      </form>
      {/* <DocumentUpload /> */}
    </div>
    </div>
  );
};
 
export default ViewSubmittedForm;