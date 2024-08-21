import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
 
 
const LinkedInMaster = () => {
  let min = 77739;
  let max= 9876542456;
  const [form, setForm] = useState({
    // LinkedInID:0,
    LinkedInPath:'',
    // RecentCheckDate:'',
    // LinkedInURLAudit:'',
    // AuditBy_EmpID:0,
    // FollowGyansys:false,
    // ShowsGyansys:false,
    // NoURL:false,
    // ProfilePhotograph:false,
    // LookingForChange:false,
    // Status:'',
    JoineeID: 0,
    // CreatedBy:0,
    // CreatedDate:'',
    // UpdatedBy:0,
    // UpdatedDate:''

  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
      JoineeID : Math.floor(min + (Math.random() * (max-min)))
    });
  };
 
 
const handleSubmit = async(e) => {
  e.preventDefault();        
  try
  {            
    const response = await fetch('http://192.168.7.187:3000/Linkedin/add/', 
      {                
        method:'POST',                
        headers: {                    
          'Content-Type':'application/json',      
        },              
        body:JSON.stringify(form),            
      });          
    const result = await response.json();
    console.log('Form submission response:', result);
    if (response.status===201){
    alert("form submited sucessfully");
    }
  }
  
  catch (error) { console.error('Error submitting form:', error); } 
};

  return (
  
  <div className="mx-auto">
    <div className="col-md-8">
      <div className="card">
        <div className="card-body">
        <h2>Linkedin</h2>
        <form className="form"  onSubmit={handleSubmit}>
        <div className="label">
          <div className="mb-3">
            <label htmlFor="LinkedInPath">Linkedin URL:</label><br></br>
            <div class="input-group">
              <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                   <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </span>
            <input type="text" className="form-control"
              id="LinkedInPath" name="LinkedInPath" value={form.LinkedInPath} onChange={handleChange} required />
          </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
    </div>
  </div>
 
 
  );
};
 
export default LinkedInMaster;