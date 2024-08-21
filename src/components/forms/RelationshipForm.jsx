// import React, { useState } from "react";

// function RelationshipForm() {
//   const [formData, setFormData] = useState({
//     _id: "",
//     RelationshipDesc: "",
//     RelationshipID: "",
//     __v: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/relationships/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();
//       console.log("Form submission response:", result);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//   return (
//     <div c>
//       <div >
//         <div >
//           <div className="card">
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <legend className="my-5">RelationshipMaster</legend>

//                 <div className="mb-3">
//                   <label
//                     htmlFor="RelationshipDesc"
//                     value={formData.RelationshipDesc}
//                     className="form-label"
//                   >
//                     RelationshipDesc
//                   </label>
//                   <input
//                     type="text"
//                     name="RelationshipDesc"
//                     className="form-control"
//                     id="RelationshipDesc"
//                     required={true}
//                     onChange={handleChange}
//                   />
//                   <p></p>
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RelationshipForm;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RelationshipMaster = () => {
  const [formData, setFormData] = useState({
    _id:'',
    RelationshipDesc:'',
    RelationshipID:'',
    __v:''
  });

  const [relationshipData, setRelationshipData] = useState([]);

  useEffect(() => {
    fetchRelationshipData();
  }, []);

  const fetchRelationshipData = async () => {
    try {
      const response = await fetch('http://localhost:3000/relationships'); 
      const data = await response.json();
      setRelationshipData(data);
    } catch (error) {
      console.error('Error fetching relationship data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/relationships/add', {
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
        fetchRelationshipData();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            
              <form onSubmit={handleSubmit}>
                <legend className='my-5'>RelationshipMaster</legend>

                <div className="mb-3">
                  <label htmlFor="RelationshipDesc" className="form-label">Relationship Description</label>
                  <input
                    type="text"
                    name='RelationshipDesc'
                    className="form-control"
                    id="RelationshipDesc"
                    value={formData.RelationshipDesc}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            
          </div>
        </div>
      </div>
    
      <div className="col-md-8 mt-4">
        <div className="card">
          <div className="card-body">
      
        <h3>Relationship Master Data</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Relationship Description</th>
              <th>Relationship ID</th>
              <th>__v</th>
              
            </tr>
          </thead>
          <tbody>
            {relationshipData.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.RelationshipDesc}</td>
                <td>{item.RelationshipID}</td>
                <td>{item.__v}</td>
                
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

export default RelationshipMaster;
