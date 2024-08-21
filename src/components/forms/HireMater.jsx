// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HireMaster = () => {
//   const [form, setForm] = useState({
//         _id: "",
//         HireID: 0,
//         HireType: "",
//         CreatedBy: 0,
//         CreatedDate: "",
//         UpdatedBy: 0,
//         UpdatedDate: ""
//   });

  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value
//     });
//   };


  
//   const handleSubmit = async(e) => {
//         e.preventDefault();        
//         try
//         {            
//           const response = await fetch('http://localhost:3000/hire/hiremaster', 
//             {                
//               method:'POST',                
//               headers: {                    
//                 'Content-Type':'application/json',      
//               },              
//               body:JSON.stringify(form),            
//             });          
//           const result = await response.json();
//           console.log('Form submission response:', result);
//           if (response.status===201){
//             alert("form submitted sucessfully");
//           }
//         }
        
//         catch (error) { console.error('Error submitting form:', error); } 
//       };
 
//   return (

//     <section id="client" className="card" style={{ border: "none" }}>
//     <h2>Hire Form</h2>
//     <form className="form"  onSubmit={handleSubmit}>
//     <div className="label">
//             <label htmlFor="HireType">Hire Type:</label><br></br>
//             <input type="text" className={`styled-input `}
//                 id="HireType" name="HireType"
//                 value={form.HireDesc}
//                 onChange={handleChange}
//                 required
//             />
            
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//             </section>
//   );
// };
//   export default HireMaster;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const HireMaster = () => {
  const [form, setForm] = useState({
    _id: "",
    HireID: 0,
    HireType: "",
    CreatedBy: 0,
    CreatedDate: "",
    UpdatedBy: 0,
    UpdatedDate: ""
  });

  const [hireData, setHireData] = useState([]);

  useEffect(() => {
    fetchHireData();
  }, []);

  const fetchHireData = async () => {
    try {
      const response = await fetch('http://localhost:3000/hire/hiremaster');
      const data = await response.json();
      setHireData(data); 
    } catch (error) {
      console.error('Error fetching hire data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/hire/hiremaster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log('Form submission response:', result);
      if (response.status === 201) {
        toast.success("Form submitted successfully");
        fetchHireData();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error in form submission');
    }
  };

  return (
    <div>

    <ToastContainer/>
    <section id="client" className="card" style={{ border: "none" }}>
    
      <h2>Hire Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="label">
          <label htmlFor="HireType">Hire Type:</label><br></br>
          <input
            type="text"
            className={`styled-input`}
            id="HireType"
            name="HireType"
            value={form.HireType}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </section>

      <br/>
        <h3>Hire Master Data</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hire Type</th>
              <th>Created By</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {hireData.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.HireType}</td>
                <td>{item.CreatedBy}</td>
                <td>{item.CreatedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    
    
    
  );
};

export default HireMaster;
