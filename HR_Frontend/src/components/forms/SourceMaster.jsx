// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// export default function SourceMaster() {
//   const [formData, setFormData] = useState({
//     Source: '',
//     DetailsOfSource: ''
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:3000/sources/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const result = await response.json();
//       console.log('Form submission response:', result);
      
      
//       setFormData({
//         Source: '',
//         DetailsOfSource: ''
//       });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
    
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <legend className='my-5'>SourceMaster</legend>
                
//                 <div className="mb-3">
//                   <label htmlFor="Source" className="form-label">Source</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     id="Source" 
//                     required={true} 
//                     value={formData.Source} 
//                     onChange={handleChange} 
//                   />
//                 </div>
                
//                 <div className="mb-3">
//                   <label htmlFor="DetailsOfSource" className="form-label">DetailsOfSource</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     id="DetailsOfSource" 
//                     required={true} 
//                     value={formData.DetailsOfSource} 
//                     onChange={handleChange} 
//                   />
//                 </div>
                
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
    
//   );
// }
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SourceMaster = () => {
  const [formData, setFormData] = useState({
    Source: '',
    DetailsOfSource: ''
  });

  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    fetchSourceData();
  }, []);

  const fetchSourceData = async () => {
    try {
      const response = await fetch('http://localhost:3000/sources');
      const data = await response.json();
      setSourceData(data);
    } catch (error) {
      console.error('Error fetching source data:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/sources/add', {
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
        fetchSourceData();
        setFormData({
          Source: '',
          DetailsOfSource: ''
        });
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
              <legend className='my-5'>Source Master</legend>

              <div className="mb-3">
                <label htmlFor="Source" className="form-label">Source</label>
                <input
                  type="text"
                  className="form-control"
                  id="Source"
                  required={true}
                  value={formData.Source}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="DetailsOfSource" className="form-label">Details of Source</label>
                <input
                  type="text"
                  className="form-control"
                  id="DetailsOfSource"
                  required={true}
                  value={formData.DetailsOfSource}
                  onChange={handleChange}
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
            <h3>Source Master Data</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Source</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {sourceData.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.Source}</td>
                    <td>{item.DetailsOfSource}</td>
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

export default SourceMaster;
