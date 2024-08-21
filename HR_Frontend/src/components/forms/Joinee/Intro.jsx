import React, { useState ,useEffect} from 'react';

function Intro({ setStartfilling, onStartFilling,themeicon }) {
    const [intro, setIntro] = useState('wait');
    
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
 const cardClass = `card  ${season} d-flex `;

    const handleChange = () => {
        setIntro('go');
        setStartfilling('go'); 
        onStartFilling();
    };

    return (
        <div className="mx-auto">
            <div className="col-md-8">
                <div className={cardClass}>
                    <div className="card-body">
                        <form>
                            <legend className='my-5'>Welcome to Preonboarding</legend>
                            <p>Instructions for filling</p>
                            <ol>
                            <li>* Verify all pre-filled details for correctness before submission.</li>
                            <li>* Edit the duration of your on-site assignment and visa type only if applicable.</li>
                            <li>* Upload a recent passport-sized photo in the designated section.</li>
                            <li>* If you encounter any difficulties or have questions while filling out the form, please contact us for assistance.</li>
                            </ol>
                            <button type="button" className="btn btn-primary" onClick={handleChange}>Start filling form</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;
