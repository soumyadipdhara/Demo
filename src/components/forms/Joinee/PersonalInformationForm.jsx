import React, { useState, useEffect, useRef } from 'react';
import { getNames } from 'country-list';
import './Theme.css';
import DocumentUpload from '../../Documentup/DocumentUpload'

const fetchOptions = async (url) => {

  try {

    const response = await fetch(url);

    if (!response.ok) throw new Error('Network response was not ok');

    return await response.json();

  } catch (error) {

    console.error('Fetch error:', error);

    return [];

  }

};

const PersonalInformationForm = ({ themeicon }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [nationalities, setNationalities] = useState([]);
  const [formData, setFormData] = useState({
    // PersonalDetailsID: 0,
        UserID: 0,
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Gender: "",
        BirthCountryID: 0,
        BloodGroup: "",
        MaritalStatus: "",
        DOB: "",
        BirthPlaceCityID: 0,
        BirthStateID: 0,
        Nationality: "",
        FatherName: "",
        SpouseName: "",
        GuardianName: "",
        AadharNo: "",
        Submitted: false,
        PanNo: "",
        OnSiteExperience: false,
        DurationOfOnsiteAssignment: null,
        VisaType: "",
        OnsiteCountryID: null,
        CreatedBy: 0,
        CreatedDate: "",
        UpdatedBy: 0,
        UpdatedDate: ""
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
 const [isEditable, setIsEditable] = useState(true);
 const [isSubmitted, setIsSubmitted] = useState(false);
 const handleSave = () => {
  localStorage.setItem('personalInformationData', JSON.stringify(formData));
  setIsEditable(false);
};

const handleEdit = () => {
  setIsEditable(true);
};

 useEffect(() => {
   setSeason(getSeason()); 
 }, [themeicon]);
 
 useEffect(() => {
  fetch(COUNTRY_API_URL)
    .then(response => response.json())
    .then(data => {
      setCountries(data);
      setNationalities([...new Set(data.map(country => ({
        NationalityID: country.CountryID,
        Nationality: country.Nationality
      })))]);
    })
    .catch(error => console.error('Error fetching countries:', error));
}, []);

useEffect(() => {
  // Fetch countries
  fetch('http://192.168.7.187:3000/countries')
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(error => console.error('Error fetching countries:', error));
}, []);

useEffect(() => {
  if (selectedCountry) {
    fetch(`http://192.168.7.187:3000/states/country/${selectedCountry}`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  }
}, [selectedCountry]);

useEffect(() => {
  if (selectedState) {
    fetch(`http://192.168.7.187:3000/cities/state/${selectedState}`)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  }
}, [selectedState]);

const handleCountryChange = (event) => {
  const value = event.target.value;
  setSelectedCountry(value);
  setSelectedState(''); // Clear state and city when country changes
  setSelectedCity('');
  setFormData(prevFormData => ({
    ...prevFormData,
    BirthCountryID: value
  }));
};

const handleStateChange = (event) => {
  const value = event.target.value;
  setSelectedState(value);
  setSelectedCity(''); // Clear city when state changes
  setFormData(prevFormData => ({
    ...prevFormData,
    BirthStateID: value
  }));
};

const handleCityChange = (event) => {
  const value = event.target.value;
  setSelectedCity(value);
  setFormData(prevFormData => ({
    ...prevFormData,
    BirthPlaceCityID: value
  }));
};

const cardClass = `card  ${season}`;


const COUNTRY_API_URL = 'http://192.168.7.187:3000/countries';
const STATE_API_URL = 'https://api.example.com/states';
const CITY_API_URL = 'https://api.example.com/cities';
useEffect(() => {
  fetch(COUNTRY_API_URL)
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(error => console.error('Error fetching countries:', error));
}, []);

useEffect(() => {
  if (formData.BirthCountryID) {
    // Fetch states based on selected country
    fetch(`${STATE_API_URL}?countryId=${formData.BirthCountryID}`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  } else {
    setStates([]);
  }

  // Reset state and city when country is changed
  setFormData(prevData => ({
    ...prevData,
    BirthStateID: '',
    BirthPlaceCityID: ''
  }));
}, [formData.BirthCountryID]);

useEffect(() => {
  if (formData.BirthStateID) {
    // Fetch cities based on selected state
    fetch(`${CITY_API_URL}?stateId=${formData.BirthStateID}`)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  } else {
    setCities([]);
  }

  // Reset city when state is changed
  setFormData(prevData => ({
    ...prevData,
    BirthPlaceCityID: ''
  }));
}, [formData.BirthStateID]);

// <--------------- theme for the card --------------------> 
  
 
    const handleRefresh = () => {
      setFormData({
        UserID: 0,
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Gender: "",
        BirthCountryID: 0,
        BloodGroup: "",
        MaritalStatus: "",
        DOB: "",
        BirthPlaceCityID: 0,
        BirthStateID: 0,
        Relation:"",
        Nationality: "",
        FatherName: "",
        SpouseName: "",
        GuardianName: "",
        fatherGuardianSpouseName:"",
        AadharNo: "",
        Submitted: true,
        PanNo:"",
        OnSiteExperience: false,
        DurationOfOnsiteAssignment: null,
        VisaType: "",
        OnsiteCountryID: null,
        CreatedBy: 0,
        CreatedDate: "",
        UpdatedBy: 0,
        UpdatedDate: ""
      });
      setHasOnsiteExperience(false);
      setDurationOfOnsite('');
      setVisaType('');
      setOnsiteCountryID('');
      setIsValid({ aadhaar: true, pan: true });
      setIsEditable(true);
      setIsSubmitted(false);
      handleEdit();
    };
    

    const [hasOnsiteExperience, setHasOnsiteExperience] = useState(false);
    const [DurationOfOnsite, setDurationOfOnsite] = useState('');
    const [VisaType, setVisaType] = useState('');
    const [OnsiteCountryID, setOnsiteCountryID] = useState('');

    const [isValid, setIsValid] = useState({ aadhaar: true, pan: true });
    
    const validateAadhaar = (number) => {
      return /^\d{12}$/.test(number);
    };
    const validatePan = (number) => {
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number);
    };

    
    
    const handleCheckboxChange = (event) => {
      const checked = event.target.checked;
      setHasOnsiteExperience(checked);
      if(checked){
        setFormData((prevFormData) => ({
          ...prevFormData,
          
          OnSiteExperience: true, // update the relation in the formData state
        }));
      }
      else if(!checked) {
        setDurationOfOnsite('');
        setVisaType('');
        setOnsiteCountryID('');
      }


    };

  const passportPhotoInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  const handleRelationChange = (e) => {
    const selectedRelation = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      Relation: selectedRelation,
      // Clear the previous name field value
      [prevFormData.Relation + "Name"]: ""
    }));
  };
 
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
 
  const renderNameField = () => {
    switch (formData.Relation) {
      case "Father":
        return (
<input
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            name="FatherName"
            value={formData.FatherName}
            onChange={handleNameChange}
            readOnly={!isEditable}
          />
        );
      case "Spouse":
        return (
<input
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            name="SpouseName"
            value={formData.SpouseName}
            onChange={handleNameChange}
            readOnly={!isEditable}
          />
        );
      case "Guardian":
        return (
<input
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            name="GuardianName"
            value={formData.GuardianName}
            onChange={handleNameChange}
            readOnly={!isEditable}
          />
        );
      default:
        return null;
    }
  };
const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData({
      ...formData,
      UserID: userData?.UserID,
      CreatedBy: userData?.UserID,
      UpdatedBy: userData?.UserID,
      [name]: value
    });
 
    if (name === 'PanNo') {
      setIsValid((prevState) => ({
        ...prevState,
        pan: validatePan(value.toUpperCase())
      }));
    } else if (name === 'AadharNo') {
      setIsValid((prevState) => ({
        ...prevState,
        aadhaar: validateAadhaar(value)
      }));
    }
  
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };
  const handleDrop = (e, name) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
        const response = await fetch('http://192.168.7.187:3000/personaldetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log('Form submission response:', result);
        if (response.status === 201) {
            
            alert("Form submitted successfully");
            
            handleRefresh();
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };
  
  const formLabelStyle = {
    // fontWeight: 'bold',
  };
  const requiredStyle = {
    color: 'red',
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
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  };

 

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
      console.log(parsedUserData);

      // You can also directly access specific properties if needed
      console.log('User ID:', parsedUserData.UserID);
      console.log('Role ID:', parsedUserData.RoleID);
      console.log('Token:', storedToken);
    }
  }, []);

  return (

    <div className={cardClass}>
      {/* <p>name {userData.FirstName},{userData.LastName}</p> */}
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Enter Your Personal Information</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
        <div style={{ flex: '1' }}>
            <label htmlFor="FirstName" style={{ ...formLabelStyle, display: 'flex', alignItems: 'center' }}>
                First Name
                <span style={requiredStyle}>*</span>
                <span className="info-icon" data-tooltip="Enter First Name" id="info1" style={{ marginLeft: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                </span>
            </label>
            <input
                type="text"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
readOnly={!isEditable}
            />
        </div>

        <div style={{ flex: '1' }}>
            <label htmlFor="MiddleName" style={{ ...formLabelStyle, display: 'flex', alignItems: 'center' }}>
                Middle Name
                <span className="info-icon" data-tooltip="Enter Middle Name" id="info2" style={{ marginLeft: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                </span>
            </label>
            <input
                type="text"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                id="MiddleName"
                name="MiddleName"
                value={formData.MiddleName}
                onChange={handleChange}
readOnly={!isEditable}
            />
        </div>

        <div style={{ flex: '1' }}>
            <label htmlFor="LastName" style={{ ...formLabelStyle, display: 'flex', alignItems: 'center' }}>
                Last Name
                <span style={requiredStyle}>*</span>
                <span className="info-icon" data-tooltip="Enter Last Name" id="info3" style={{ marginLeft: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                </span>
            </label>
            <input
                type="text"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                id="LastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
readOnly={!isEditable}
            />
        </div>
    </div>
    </div>
    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
    <div style={{ flex: '1' }}>
        <label htmlFor="BirthCountryID" style={{ ...formLabelStyle, display: 'flex', alignItems: 'center' }}>Birth Country

        <span style={requiredStyle}>*</span>
            <span className="info-icon" data-tooltip="Select your birth city" id="info3" style={{ marginLeft: '5px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
            </span>
        </label>

        <select
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          id="BirthCountryID"
          name="BirthCountryID"
          value={selectedCountry}
          onChange={handleCountryChange}
          disabled={!isEditable}
          >
            <option value="">Select Birth Country</option>
            {countries.map(country => (
              <option key={country.CountryID} value={country.CountryID}>
                {country.CountryName}
              </option>
            ))}
        </select>
      </div>
    <div style={{ flex: '1' }}>
        <label htmlFor="BirthStateID" style={{ ...formLabelStyle, display: 'flex', alignItems: 'center' }}>
            Birth State
            <span style={requiredStyle}>*</span>
            <span className="info-icon" data-tooltip="Select your birth Country" id="info2" style={{ marginLeft: '5px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
            </span>
        </label>
        <select
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            id="BirthStateID"
            name="BirthStateID"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!isEditable || !selectedCountry}
        >
          <option value="">Select Birth State</option>
          {states.map(state => (
            <option key={state.StateID} value={state.StateID}>
              {state.StateName}
            </option>
          ))}
        </select>
    </div>
</div>
<div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
    <div style={{ flex: '1' }}>
        <label htmlFor="BirthPlaceCityID" style={{ ...formLabelStyle, display: 'flex', alignItems: 'center' }}>
            Birth City
            <span style={requiredStyle}>*</span>
            <span className="info-icon" data-tooltip="Select your birth city" id="info3" style={{ marginLeft: '5px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
            </span>
        </label>
        <select
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            id="BirthPlaceCityID"
            name="BirthPlaceCityID"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!isEditable || !selectedState}
        >
            <option value="">Select Birth City</option>
          {cities.map(city => (
            <option key={city.CityID} value={city.CityID}>
              {city.CityName}
            </option>
          ))}
        </select>
    </div>

    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
  <label style={formLabelStyle}>
    Nationality
    <span style={requiredStyle}>*</span>
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span className="info-icon" data-tooltip="Select your nationality" id="info1" style={{ marginLeft: '5px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
          style={{ verticalAlign: 'middle' }}
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </span>
  </label>

  <select
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          id="Nationality"
          name="Nationality"
          value={formData.NationalityID}
          onChange={handleChange}
          disabled={!isEditable}
        >
          <option value="">Select Nationality</option>
          {nationalities.map(nationality => (
            <option key={nationality.NationalityID} value={nationality.NationalityID}>
              {nationality.Nationality}
            </option>
          ))}
        </select>
      </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
  <div style={{ flex: '1' }}>
    <label htmlFor="gender" style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Gender
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Select your Gender" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </label>
    
    <select
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      name="Gender"
      value={formData.Gender}
      onChange={handleChange}
      disabled={!isEditable}
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Others">Others</option>
    </select>
  </div>

  <div style={{ flex: '1' }}>
    <label htmlFor="DOB" style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Date of Birth
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Enter your birth date" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </label>
    
    <input
      type="date"
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      id="DOB"
      name="DOB"
      value={formData.DOB}
      onChange={handleChange}
readOnly={!isEditable}
    />
  </div>
</div>

<div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
  <div style={{ flex: '1' }}>
    <label htmlFor="bloodGroup" style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Blood Group
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Enter your blood Group" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </label>
    
    <select
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      name="BloodGroup"
      value={formData.BloodGroup}
      onChange={handleChange}
      disabled={!isEditable}
    >
      <option value="">Select Blood Group</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>
  </div>


  <div style={{ flex: '1' }}>
    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Marital Status
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Select your marital Status" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </label>
    
    <select
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      name="MaritalStatus"
      value={formData.MaritalStatus}
      onChange={handleChange}
      disabled={!isEditable}
    >
      <option value="">Select Marital Status</option>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
      <option value="Divorced">Divorced</option>
      <option value="Widowed">Widowed</option>
    </select>
  </div>
  </div>


  <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
  <div style={{ flex: '1' }}>
  <label htmlFor="relation" style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Relation
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Select your Relation with them" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </label>
    
    <select
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      name="Relation"
      value={formData.Relation}
      onChange={handleRelationChange}
      disabled={!isEditable}
    >
      <option value="">Select Relation</option>
      <option value="Father">Father</option>
      <option value="Guardian">Guardian</option>
      <option value="Spouse">Spouse</option>
    </select>
  </div>
  <div style={{ flex: '1' }}>
  <label htmlFor="fatherGuardianSpouseName" style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Name
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Enter Name" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
    </label>
    
   {renderNameField()}
   
  </div>


</div>

<div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
  <div style={{ flex: '1' }}>   
    <label htmlFor="AadharNo" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
      Aadhaar Number
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Enter Aadhar Number" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
     
    </label>
    <input
      type="text"
      id="AadharNo"
      name="AadharNo"
      value={formData.AadharNo}
      onChange={handleChange}
      readOnly={!isEditable}
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      maxLength="12"
    />
    {!isValid.aadhaar && <p style={{ color: 'red', marginTop: '4px' }}>Invalid Aadhaar number.</p>}
  </div>
  
  <div style={{ flex: '1' }}>
    <label htmlFor="PanNo" style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      PAN Number
      <span style={requiredStyle}>*</span>
      <span className="info-icon" data-tooltip="Enter your PAN number" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </span>
      
    </label>
    <input
      type="text"
      id="PanNo"
      name="PanNo"
      value={formData.PanNo}
      onChange={handleChange}
      readOnly={!isEditable}
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      maxLength="10"
    />
    {!isValid.pan && <p style={{ color: 'red', marginTop: '4px' }}>Invalid PAN number.</p>}
  </div>
</div>

<div style={{ marginBottom: '20px' }}>
<span className='d-flex align-items-center'>
    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
      Onsite Experience
    </label>
    <input
      type="checkbox"
      name="OnSiteExperience"
      checked={hasOnsiteExperience}
      onChange={handleCheckboxChange}
      readOnly={!isEditable}
      style={{ marginLeft: '10px', marginRight: '10px' }}
      value={formData.OnSiteExperience}
    />
  </span>
  {hasOnsiteExperience && (
    <div style={{
      marginTop: '10px',
      padding: '10px',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
            Duration
            <span style={requiredStyle}>*</span>
            <span className="info-icon" data-tooltip="Enter the duration of your onsite assignment" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
              </svg>
            </span>
          </label>
          <input
            type="text"
            name='DurationOfOnsiteAssignment'
            value={formData.DurationOfOnsiteAssignment}
            onChange={handleChange}
readOnly={!isEditable}
            placeholder="Enter duration"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
            Visa Type
            <span style={requiredStyle}>*</span>
            <span className="info-icon" data-tooltip="Enter the type of your visa" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
              </svg>
            </span>
          </label>
          <input
            type="text"
            name='VisaType'
            value={formData.VisaType}
            onChange={handleChange}
readOnly={!isEditable}
            placeholder="Enter visa type"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', ...formLabelStyle }}>
            Country
            <span style={requiredStyle}>*</span>
            <span className="info-icon" data-tooltip="Select your country" id="info1" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
              </svg>
            </span>
          </label>
          <select
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            id="OnsiteCountryID"
            name="OnsiteCountryID"
            value={formData.OnsiteCountryID}
            onChange={handleChange}
            disabled={!isEditable}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
            <option key={country.CountryID} value={country.CountryID}>
              {country.CountryName}
            </option>))}
          </select>
        </div>
      </div>
    </div>
  )}
</div>





<label htmlFor="PassportSizePhoto" style={formLabelStyle}>
    Upload Passport Size Photo<span style={requiredStyle}>*</span>
</label>
  <DocumentUpload isEditable={isEditable} />

<div style={buttonContainerStyle}>
          {isEditable ? (
            <button
              type="button"
              style={btnPrimaryStyle}
              onClick={handleSave}
             
            >
              Save
            </button>
          ) : (
            <>
              <button
                type="button"
                style={{ ...btnPrimaryStyle, marginRight: '10px' }}
                onClick={handleEdit}
              >
                Edit
              </button>
              {!isSubmitted && (
                <button
                  type="submit"
                  style={btnPrimaryStyle}
                >
                  Submit
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;