import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DesignationMaster = () => {
  const [form, setForm] = useState({
    _id:'',
    DesignationID:0,
    DesignationDesc: '',
    CreatedBy :0,
    CreatedDate:'',
    UpdatedBy :0,
    UpdatedDate:'' 
  });

  const [Data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/designations/');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching source data:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();        
    try{            
        const response = await fetch('http://192.168.7.187:3000/designations/add', {                
        method:'POST',                
        headers: {                    
          'Content-Type':'application/json',      
        },              
        body:JSON.stringify(form),            
    });          
    const result = await response.json();
    console.log('Form submission response:', result);
    if(response.status===201){
      alert("form submited sucessfully");
    }
    
}
catch(error) { console.error('Error submitting form:', error); } 
};

  


  return (
     <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2>Designation Form</h2>
              <form className="form"  onSubmit={handleSubmit}>
                <div className="label">
                  <label htmlFor="DesignationDesc" className='label'>Designation Description:</label><br></br>
                  <div class="input-group">
                    <span className="input-group-text info-icon" data-tooltip="Enter Passport Issue Date" id="info1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                    </span>
                    <select className="form-control" name="DesignationDesc" onChange={handleChange} value={form.DesignationDesc}
                      id="DesignationDesc" placeholder="select-designation" required>
                      <option value="">Select Status</option>
                      <option value="intern">intern</option>
                      <option value="Associate Consultant">Associate Consultant</option>
                      <option value="Consultant 1">Consultant 1</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                    </select>
                </div>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
        </div>
      </div>

      <div className="col-md-8 mt-4">
        <div className="card">
          <div className="card-body">
            <h3>Designation Master Data</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Designation ID</th>
                  <th>Designation Description</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.DesignationID}</td>
                    <td>{item.DesignationDesc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
     </div>  
  );
};

export default DesignationMaster;

