import React from 'react';
import { AppBar, Toolbar, Button, Typography, Tooltip, useTheme, useMediaQuery } from '@mui/material';
 
const Footer = ({ activeForm, setActiveForm, themeicon, handleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const SunIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5zm0 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 .75-.75h1.5zm8.4-8.4a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5zm-15.9 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5zm11.325 5.325a.75.75 0 0 1 .3.825l-1.5 4.5a.75.75 0 0 1-1.4-.45l1.5-4.5a.75.75 0 0 1 .6-.675zm-5.7 0a.75.75 0 0 1 .6.675l1.5 4.5a.75.75 0 0 1-1.4.45l-1.5-4.5a.75.75 0 0 1 .3-.825zM12 5.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5z"/>
    </svg>
    );
     
    const MoonIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.25a7.5 7.5 0 0 1 6.926 10.354 5.25 5.25 0 1 1-7.25-7.5A7.475 7.475 0 0 1 12 2.25zm0-1.5A9 9 0 0 0 3 10.5a6.75 6.75 0 1 0 10.5 8.4 9 9 0 0 0 0-17.4z"/>
    </svg>
    );
  return (
<AppBar position="static" color="default" sx={{ top: 'auto', bottom: 0, padding: '0.7rem' }}>
<Toolbar>
<Typography variant="h6" sx={{ flexGrow: 1 }}>
          {/* Optional: Add your title or logo here */}
</Typography>
 
        {!isMobile ? (
<>
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
</>
        ) : (
<Button edge="start" color="inherit" aria-label="menu">
<Typography variant="button">Menu</Typography>
</Button>
        )}
 
        <Tooltip title="Toggle theme">
<Button onClick={handleTheme} color="inherit">
            {themeicon === "light" ? (
<span role="img" aria-label="sun">☀️</span> // Sun emoji for light theme
            ) : (
<span role="img" aria-label="moon">🌙</span> // Moon emoji for dark theme
            )}
</Button>
</Tooltip>
</Toolbar>
</AppBar>
  );
};
 
export default Footer;