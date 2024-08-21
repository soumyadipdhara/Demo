// import React,{useState} from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// export default function EmergencyContactMaster() {
//     const [form, setForm] = useState({
//         JoineeID: 0,
//         EmergencyContactPersonName: "",
//         RelationshipID: 0,
//         EmergencyContactNo: "",
//         CreatedBy: 0,
//         CreatedDate: "",
//         UpdatedBy: 0,
//         UpdatedDate: "",
//         _id: "",
//         EmergencyContactID: 0,
//         __v: 0
//     });

//     const handleOnChange = (e) => {
//         const { name, value } = e.target || e; 
//         setForm({
//             ...form,
//             [name]: value
//         });
//     };
    
    

//     const handleSubmit = async(e) => {
//         e.preventDefault();        
//         try
//         {            
//           const response = await fetch('http://localhost:3000/EmergencyContacts/add', 
//             {                
//               method:'POST',                
//               headers: {                    
//                 'Content-Type':'application/json',      
//               },              
//               body:JSON.stringify(form),            
//             });          
//           const result = await response.json();
//           console.log('Form submission response:', result);
//           if(response.status===201){
//           alert("form submited sucessfully");}
//         }
        
//         catch (error) { console.error('Error submitting form:', error); } 
//       };
//     // const [EmergencyContactNo, setNo] = useState('');
//     // const [valid, setValid] = useState(true);
//     // const validatePhoneNo = (EmergencyContactNo) => {
//     //     const phoneNumberPattern = /^\d{11,14}$/;
//     //     return phoneNumberPattern.test(EmergencyContactNo);
//     // };
    
//     // const handleChange = (value, data) => {
//     //     if (typeof value === 'string') {
//     //         setForm({
//     //             ...form,
//     //             EmergencyContactNo: value
//     //         });
//     //         setValid(validatePhoneNo(value));
//     //     }
//     // };
    
    
//   return (
//     <div className="container">
//   <div className="card mt-5">
//     <div className="card-body">
//       <legend className="card-title mb-4">EmergencyContactMaster</legend>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//         <div className="col-md-6">
//             <label htmlFor="JoineeID" className="form-label">JoineeID</label><br></br>
//             <select name="JoineeID" onChange={handleOnChange} value={form.JoineeID} className="btn btn-secondary dropdown-toggle" id="JoineeID" required={true}>
//               <option value="">Select Joinee ID</option>
//               <option value="joinee1">Joinee 1</option>
//               <option value="joinee2">Joinee 2</option>
//               <option value="joinee3">Joinee 3</option>
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="EmergencyContactPersonName" className="form-label">EmergencyContactPersonName</label>
//             <input type="text" className="form-control" id="EmergencyContactPersonName" name="EmergencyContactPersonName" value={form.EmergencyContactPersonName} onChange={handleOnChange} required={true}/>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="RelationshipID" className="form-label">RelationshipID</label>
//             <input type="text" className="form-control" id="RelationshipID" name="RelationshipID" value={form.RelationshipID} onChange={handleOnChange} required={true}/>
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="EmergencyContactNo" className="form-label">Emergency Contact No</label>
//             <PhoneInput
//                 country={'us'}
//                 value={form.EmergencyContactNo}
//                 onChange={handleOnChange}
//                 inputProps={{ required: true }}
//                 className="form-control"
//                 id="EmergencyContactNo"
//                 name="EmergencyContactNo"
//                 maxlength="14"
//                 minlength="11"  
//             />

//             {/* {!valid && <p className='text-danger'>Please Enter Valid Contact Number.</p>} */}
//             </div>

//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   </div>
// </div>

//   )
// }
import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'; 

const EmergencyContactMaster = () => {
  const [form, setForm] = useState({
    JoineeID: "",
    EmergencyContactPersonName: "",
    RelationshipID: "",
    EmergencyContactNo: "",
    CreatedBy: 0,
    CreatedDate: "",
    UpdatedBy: 0,
    UpdatedDate: "",
    _id: "",
    EmergencyContactID: 0,
    __v: 0
  });

  const [relationshipDescList, setRelationshipDescList] = useState([]);

  useEffect(() => {
    fetchRelationshipDescList();
  }, []);

  const fetchRelationshipDescList = async () => {
    try {
      const response = await fetch('http://localhost:3000/relationships');
      if (!response.ok) {
        throw new Error('Failed to fetch RelationshipDesc list');
      }
      const data = await response.json();
      setRelationshipDescList(data);
    } catch (error) {
      console.error('Error fetching RelationshipDesc list:', error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target || e;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setForm({
      ...form,
      [name]: selectedOption ? selectedOption.value : ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/EmergencyContacts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log('Form submission response:', result);
      if (response.status === 201) {
        alert("Form submitted successfully");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  
  const joineeOptions = [
    { value: "1", label: "Suvam" },
    { value: "2", label: "Swayam" },
    { value: "3", label: "Suvendu" },
    { value: "9", label: "Subhasis" },
    { value: "99", label: "Saurav" }
  ];

  
  const relationshipOptions = relationshipDescList.map(relationship => ({
    value: relationship.RelationshipID,
    label: relationship.RelationshipDesc
  }));

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <legend className="card-title mb-4">Emergency Contact Master</legend>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="JoineeID" className="form-label">Joinee</label>
                <Select
                  name="JoineeID"
                  options={joineeOptions}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'JoineeID' })}
                  value={joineeOptions.find(option => option.value === form.JoineeID)}
                  placeholder="Select Joinee"
                  isSearchable
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="EmergencyContactPersonName" className="form-label">Emergency Contact Person Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmergencyContactPersonName"
                  name="EmergencyContactPersonName"
                  value={form.EmergencyContactPersonName}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="RelationshipID" className="form-label">Relationship</label>
                <Select
                  name="RelationshipID"
                  options={relationshipOptions}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'RelationshipID' })}
                  value={relationshipOptions.find(option => option.value === form.RelationshipID)}
                  placeholder="Select Relationship"
                  isSearchable
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="EmergencyContactNo" className="form-label">Emergency Contact No</label>
                <PhoneInput
                  country={'us'}
                  value={form.EmergencyContactNo}
                  onChange={(value) => handleOnChange({ target: { name: 'EmergencyContactNo', value } })}
                  inputProps={{ required: true }}
                  className="form-control"
                  id="EmergencyContactNo"
                  name="EmergencyContactNo"
                  maxLength="14"
                  minLength="11"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactMaster;


