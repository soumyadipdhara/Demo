import React, { useState, useEffect } from 'react';
import DocumentUpload from '../../Documentup/DocumentUpload'
 
const Hrspoc  = ({themeicon}) => {
  const [formData, setFormData] = useState({
    UserID: 2,
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
    Comment: ''
  });


 
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
 
 const [countries, setCountries] = useState([]);
 const [birthCountryName, setBirthCountryName] = useState('');
 const [nationalityName, setNationalityName] = useState('');
 const [OnSiteCountryName, setOnSiteCountryName] = useState('');

 const [onsiteCountryName, setOnsiteCountryName] = useState('');
const cardClass = `card  ${season} d-flex `;

// <--------------- theme for the card --------------------> 
 
 
const [userData, setUserData] = useState(null);

useEffect(() => {
  // Retrieve the user data from localStorage
  const storedUserData = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  if (storedUserData && storedToken) {
    // Parse the JSON string into an object
    const parsedUserData = JSON.parse(storedUserData);

    // Set the state with the retrieved data
    setUserData(parsedUserData);

    // You can also directly access specific properties if needed
    console.log('User ID:', parsedUserData.UserID);
    console.log('Role ID:', parsedUserData.RoleID);
    console.log('Token:', storedToken);
  }
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      if (userData?.UserID) {
        // Fetch personal details
        const personalResponse = await fetch(`http://192.168.7.187:3000/personaldetails/${userData.UserID}`);
        if (!personalResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const personalData = await personalResponse.json();
        setFormData(personalData);

        // Fetch countries
        const countriesResponse = await fetch('http://192.168.7.187:3000/countries');
        if (!countriesResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const countryData = await countriesResponse.json();
        setCountries(countryData);

        // Find the country names
        const birthCountry = countryData.find(c => c.CountryID === personalData.BirthCountryID);
        if (birthCountry) {
          setBirthCountryName(birthCountry.CountryName);
        }

        const onsiteCountry = countryData.find(c => c.CountryID === personalData.OnsiteCountryID);
        if (onsiteCountry) {
          setOnsiteCountryName(onsiteCountry.CountryName);
        }
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  fetchData();
}, [userData]);
 
  const handleDurationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      DurationOfOnsiteAssignment: e.target.value
    }));
  };
  const [isEditable, setIsEditable] = useState(false);
  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://192.168.7.187:3000/personaldetails/${userData.UserID}`);
            const data = await response.json();
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
          } catch (error) {
            console.error('Error fetching personal details:', error);
          }
        };
     
        fetchData();
      }, [userData]);

  const handleCommentChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Comment: e.target.value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

 
  const requiredStyle = {
    color: 'red',
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
    background: 'linear-gradient(45deg, #0056b3, #003d7a)',
    transform: 'scale(1.05)',
  };
  const formLabelStyle = {
    display: 'block',          
    marginBottom: '8px',      
    fontWeight: 'bold',        
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
 
  return (
    <div className={cardClass}>
      
      <form>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'green' }}>HR SPOC</h2>
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
              onChange={handleChange}
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
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
 
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
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
         
          <div style={{ flex: '1' }}>
            <label htmlFor="OnSiteExperience" style={formLabelStyle}>On-Site Experience</label>
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
            <label htmlFor="DurationOfOnsiteAssignment" style={formLabelStyle}>Duration</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="DurationOfOnsiteAssignment"
              name="DurationOfOnsiteAssignment"
              value={formData.DurationOfOnsiteAssignment}
              onChange={handleDurationChange}
              readOnly
              placeholder="Enter duration"
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="VisaType" style={formLabelStyle}>Visa Type</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="VisaType"
              name="VisaType"
              value={formData.VisaType}
              onChange={handleChange}
              readOnly={!isEditable}
              placeholder="Enter visa type"
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="OnsiteCountryID" style={formLabelStyle}>On-Site Country<span style={requiredStyle}>*</span></label>
            <select
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="OnsiteCountryID"
              name="OnsiteCountryID"
              value={formData.OnsiteCountryID}
              onChange={handleChange}
              readOnly={!isEditable}
              disabled
            >
             <option value="">Select Country</option>
            {countries.map(country => (
            <option key={country.CountryID} value={country.CountryID}>
              {country.CountryName}
            </option>
          ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div style={{ flex: '1' }}>
            <label htmlFor="Relation" style={formLabelStyle}>Relation</label>
             <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="Relation"
              name="Relation"
              value={formData.Relation}
              readOnly
            />
          </div>
          <div style={{ flex: '1' }}>
            <label htmlFor="fatherGuardianSpouseName" style={formLabelStyle}>Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              id="fatherGuardianSpouseName"
              name="fatherGuardianSpouseName"
              value={formData.fatherGuardianSpouseName}
              readOnly
            />
          </div>
        </div>
        <div>
        <label htmlFor="DocumentUpload" style={formLabelStyle}>Upload Passport size photo</label>
 
        <DocumentUpload isEditable={false} />
        </div>
        <div style={{ marginTop: '20px' }}>
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
            >
              Save Comment
            </button>
          </div>
      </form>
     
    </div>
  );
};
 
export default Hrspoc;