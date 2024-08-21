// import 'bootstrap/dist/css/bootstrap.min.css';
// import React,{ useState,useEffect} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// export default function BankMaster() {
//     const [form, setForm] =useState({        
//         _id: "",
//         BankNameID: 0,
//         BankName: "",
//         Active:true,
//         CreatedBy: 0,
//         CreatedDate: "",
//         UpdatedBy: 0,
//         UpdatedDate: ""
//       });

    
//       const isActive = (event) => {
//         const isChecked = event.target.checked;
//         setForm(prevForm => ({
//             ...prevForm,
//             Active: isChecked
//         }));
//     };

//     const [relationshipData, setRelationshipData] = useState([]);
 
//     useEffect(() => {
//       fetchRelationshipData();
//     }, []);
  
//     const fetchRelationshipData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/bank/getBankNameDetails');
//         const data = await response.json();
//         setRelationshipData(data);
//       } catch (error) {
//         console.error('Error fetching relationship data:', error);
//       }
//     };
  
//       const handleChange=(e)=>{
//         const {name, value} = e.target;
//         setForm({
//           ...form,
//           [name]:value,
//         });
//       };
//       const handleSubmit = async(e) => {
//              e.preventDefault();        
//     try{            
//       const response = await fetch('http://localhost:3000/bank/addbanknamedetail', {                
//         method:'POST',                
//         headers: {                    
//       'Content-Type':'application/json',       
//     },               
//     body:JSON.stringify(form),            
//      });           
//     const result = await response.json();
//     console.log('Form submission response:', result);
//     if (response.status===201){
//       toast.success("form submited sucessfully");
//     }
//     }
//     catch(error) { console.error('Error submitting form:', error); } };

//   return (
//     <div>
//       <ToastContainer/>
//     <form onSubmit={handleSubmit}>
// <div className="container">
// <div className="card mt-5">
// <div className="card-body">
// <legend className="card-title mb-4">Bank Name Details  Master</legend>

// {/* <div className="row mb-3">
// <div className="col-md-6">
// <label htmlFor="BankNameID" className="form-label">BankName ID</label>
// <input type="number" className="form-control" name="BankNameID" value={form.BankNameID}
//                 onChange={handleChange} id="BankNameID" required={true}/>
// </div>
// </div> */}
// <div className="row mb-3">
// <div className="col-md-6">
// <label htmlFor="BankName" className="form-label">BankName</label>
// <input type="text" className="form-control" name="BankName" value={form.BankName}
//                 onChange={handleChange} id="BankName" required={true}/>
// </div>
// </div>

// <div className="row mb-3">
// <div className="col-md-6">
// <label htmlFor="Active" className="form-label">Active</label>
// <input className="form-check-input" type="checkbox" id="Active" checked={form.Active} onChange={isActive} />
// </div>
// </div>
// <button type="submit" className="btn btn-primary">Submit</button>

// </div>
// </div>
// </div>

// </form>
// <br></br>

// <h3>Bank Name Details </h3>
// <table className='table'>
//   <thead>
//     <tr>
//       <th>Bank Name</th>
//       <th>Is Active</th>
//     </tr>
//   </thead>
//   <tbody>
//     {relationshipData.map((item)=>{
//       <tr key={item._id}>
//         <td>{item.BankName}</td>
//         <td>{item.Active}</td>
//       </tr>
//     })}
//   </tbody>
// </table>


// </div>   
                                                       
//   )
// }


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function BankMaster() {
  const [form, setForm] = useState({
    _id: "",
    BankNameID: 0,
    BankName: "",
    Active: true,
    CreatedBy: 0,
    CreatedDate: "",
    UpdatedBy: 0,
    UpdatedDate: ""
  });

  const [relationshipData, setRelationshipData] = useState([]);

  useEffect(() => {
    fetchRelationshipData();
  }, []);

  const fetchRelationshipData = async () => {
    try {
      const response = await fetch('http://localhost:3000/bank/getBankNameDetails');
      const data = await response.json();
      setRelationshipData(data);
    } catch (error) {
      console.error('Error fetching relationship data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const isActive = (event) => {
    const isChecked = event.target.checked;
    setForm(prevForm => ({
      ...prevForm,
      Active: isChecked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/bank/addbanknamedetail', {
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
        fetchRelationshipData(); // Refresh the table after submitting
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="card mt-5">
            <div className="card-body">
              <legend className="card-title mb-4">Bank Name Details Master</legend>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="BankName" className="form-label">Bank Name</label>
                  <input type="text" className="form-control" name="BankName" value={form.BankName}
                    onChange={handleChange} id="BankName" required={true} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="Active" className="form-label">Active</label>
                  <input className="form-check-input" type="checkbox" id="Active" checked={form.Active} onChange={isActive} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>

      <br />

      <h3>Bank Name Details</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {relationshipData.map((item) => (
            <tr key={item._id}>
              <td>{item.BankName}</td>
              <td>{item.Active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
