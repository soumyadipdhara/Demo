import React from "react";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClientForm() {
  const [formData, setFormData] = useState({
    ClientName: "",
    ClientType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [relationshipData, setRelationshipData] = useState([]);
 
  useEffect(() => {
    fetchRelationshipData();
  }, []);

  const fetchRelationshipData = async () => {
    try {
      const response = await fetch('http://localhost:3000/Clients');
      const data = await response.json();
      setRelationshipData(data);
    } catch (error) {
      console.error('Error fetching relationship data:', error);
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{            
      const response = await fetch('http://localhost:3000/clients/add', {                
      method:'POST',                
      headers: {                    
        'Content-Type':'application/json',      
      },              
      body:JSON.stringify(formData),            
  });          
  const result = await response.json();
  console.log('Form submission response:', result);
  if(response.status===201){
    // alert("form submited sucessfully");
    toast.success("Client added successfully");
  }
  
}
catch(error) { 
  toast.error("Error submitting form",error);
  console.error('Error submitting form:', error); } 
    
  };

  return (
    <div>
      <ToastContainer/>
      <section id="client" className="card" style={{ border: "none" }}>
        <h2>Client Form</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="label">
            <label htmlFor="ClientName" className="label">Client Name:</label><br />
            <input
              className="styled-input"
              type="text"
              name="ClientName"
              id="ClientName"
              value={formData.ClientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
            <label htmlFor="ClientType" className="label">Client Type:</label><br />
            <select
              className="styled-input"
              name="ClientType"
              id="ClientType"
              onChange={handleChange}
              value={formData.ClientType}
              required
            >
              <option value="">Select Client Type</option>
              <option value="Corporate">Corporate</option>
              <option value="Individual">Individual</option>
              <option value="Non-Profit">Non-Profit</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>

      <br /><br />

      <h3>Client Details</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Client Type</th>
          </tr>
        </thead>
        <tbody>
          {relationshipData.map((item) => (
            <tr key={item._id}>
              <td>{item.ClientName}</td>
              <td>{item.ClientType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientForm;
