import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInformationForm from '../components/forms/Joinee/PersonalInformationForm';
import Intro from '../components/forms/Joinee/Intro';
import PreviousWorkRelatedDetails from '../components/forms/Joinee/Previousworkdetail';
import SkillsAndCertification from '../components/forms/Joinee/SkillsAndCertification';
import SourceInformation from '../components/forms/Joinee/SourceInformation';
import { AppBar, Toolbar, Button, Typography, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';

import MianNav from '../components/MianNav';

import Hrspoc from '../components/forms/Joinee/Hrspoc';
import { Link } from 'react-router-dom'


const JoineePage = () => {
  const [themeicon, setThemeicon] = useState("light");
  const [activeForm, setActiveForm] = useState('SkillsandCertificate');
  const [startfilling, setStartfilling] = useState('wait');
  const [backgroundImage, setBackgroundImage] = useState('');

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

  const handleSeason = (time) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const month = months[time.getMonth()];

    if (month === 'January' || month === 'February' || month === 'December') {
      setBackgroundImage(require('./season/winter.jpg'));
    } else if (month === 'March' || month === 'April' || month === 'May') {
      setBackgroundImage(require('./season/summer.jpg'));
    } else if (month === 'June' || month === 'July' || month === 'August') {
      setBackgroundImage(require('./season/winter.jpg'));
    } else {
      setBackgroundImage(require('./season/autumn.jpg'));
    }
  }

  useEffect(() => {
    handleSeason(new Date());
  }, []);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    if (currentTheme === 'dark') {
      setThemeicon("light");
    } else {
      setThemeicon("dark");
    }
  }, []);

  const handleTheme = () => {
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      setThemeicon("dark");
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      setThemeicon("light");
    }
  };

  const navbarClass = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'bg-dark' : 'bg-light';
  
  // Define appBarColor and textColor as objects
  const appBarColor = {
    backgroundColor: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'rgba(33, 37, 41, 1)' : 'rgba(163, 198, 219, 0.82)'
  };
  
  const textColor = {
    color: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'rgb(255,255,255)' : 'rgb(33,37,41)'
  };

  const startFilling = () => {
    setStartfilling('go');
    setActiveForm('Personalinfo');
  };

  const renderFormContent = () => {
    switch (activeForm) {
      case "Personalinfo":
        return <PersonalInformationForm themeicon={themeicon} />;
      case "PrevWork":
        return <PreviousWorkRelatedDetails themeicon={themeicon} />;
      case "EduDetails":
        return <div>EduDetails Form</div>;
      case "SourceInfo":
        return <SourceInformation themeicon={themeicon} />;
      case "SkillsandCertificate":
        return <SkillsAndCertification themeicon={themeicon} />;
      case "Hrspoc":
          return <Hrspoc themeicon={themeicon} />;
      default:
        return <PersonalInformationForm themeicon={themeicon} />;
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

      {/* <div className='header'>
        <nav className={`navbar navbar-expand-lg ${navbarClass}`} data-bs-theme="dark" style={{ borderRadius: '2px', padding: '.7rem' }}>
          <div className="navbar-item">Welcome, {userData?.FullName}</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
            <div>
              <a className="nav-link" href="#">Logout!</a>
            </div>
          </div>
        </nav>
      </div> */}
      <MianNav/>

      {/* <div className='header'>
      <AppBar position="static" style={appBarColor}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {userData?.FullName}
          </Typography>
          <Button component={Link} to="/">
  Log Out
</Button>
        </Toolbar>
      </AppBar>
      </div> */}

      {startfilling === 'wait' && (
        <div className='body flex-grow-1 d-flex justify-content-center'>
          <Intro setStartfilling={setStartfilling} onStartFilling={startFilling} />
        </div>
      )}
      {startfilling === 'go' && (
        <>
          <div className='body flex-grow-1 d-flex justify-content-center'>
            {renderFormContent()}
          </div>

          <AppBar position="static" sx={{ top: 'auto', bottom: 0, padding: '0.7rem', boxShadow: 'none', borderRadius: '2px' }} style={appBarColor}>
            <Toolbar>
              {!isMobile ? (
                <div className="d-flex flex-grow-1">
                  <Button
                    color={activeForm === 'Personalinfo' ? 'primary' : 'inherit'}
                    onClick={() => setActiveForm('Personalinfo')}
                  >
                    Personal Information
                  </Button>
                  <Button
                    color={activeForm === 'PrevWork' ? 'primary' : 'inherit'}
                    onClick={() => setActiveForm('PrevWork')}
                  >
                    Previous Work Related
                  </Button>
                  <Button
                    color={activeForm === 'EduDetails' ? 'primary' : 'inherit'}
                    onClick={() => setActiveForm('EduDetails')}
                  >
                    Education Details
                  </Button>
                  <Button
                    color={activeForm === 'SourceInfo' ? 'primary' : 'inherit'}
                    onClick={() => setActiveForm('SourceInfo')}
                  >
                    Source Information
                  </Button>
                  <Button
                    color={activeForm === 'SkillsandCertificate' ? 'primary' : 'inherit'}
                    onClick={() => setActiveForm('SkillsandCertificate')}
                  >
                    Skills and Certifications
                  </Button>
                  <Button
                    color={activeForm === 'Hrspoc' ? 'primary' : 'inherit'}
                    onClick={() => setActiveForm('Hrspoc')}
                  >
                    Hrspoc
                  </Button>
                </div>
              ) : (
                <Typography variant="button" sx={{ flexGrow: 1 }}>
                  Menu
                </Typography>
              )}

              <Tooltip title="Toggle theme">
                <Button onClick={handleTheme} color="inherit">
                  {themeicon === "light" ? <Brightness4 /> : <Brightness7 />}
                </Button>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </>
      )}
    </div>
  );
};

export default JoineePage;
