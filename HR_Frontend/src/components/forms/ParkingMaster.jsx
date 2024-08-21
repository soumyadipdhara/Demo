// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function ParkingMaster() {
    
//         const [form, setForm] = useState({
            
//         _id: "",
//         ParkingVehicleNumber: "",
//         VehicleID: 0,
//         JoineeID: 0,
//         ParkingCardNumber: "",
//         CreatedBy: 0,
//         CreatedDate: "",
//         UpdatedBy: 0,
//         UpdatedDate: "",
//         ParkingID: 0,
//         __v: 0
            
//         });

//         const handleChange = (e) => {
//             const { name, value } = e.target;
//             setForm({
//               ...form,
//               [name]: value
//             });
//           };
        
    
//         const handleSubmit = async (e) => {
//             e.preventDefault();
//             try {
//                 const response = await fetch('http://192.168.7.187:3000/park/parkingmaster', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(form),
//                 });
//                 const result = await response.json();
//                 console.log('Form submission response:', result);
//                 if (response.status === 201) {
//                     alert("Form submitted successfully");
//                 }
//             } catch (error) {
//                 console.error('Error submitting form:', error);
//             }
//         };
//   return (
    
//     <div className="container">
//   <div className="card mt-5">
//     <div className="card-body">
//       <legend className="card-title mb-4">ParkingMaster</legend>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="ParkingVehicleNumber" className="form-label">ParkingVehicleNumber</label>
//             <input type="text" className="form-control" onChange={handleChange} id="ParkingVehicleNumber" name="ParkingVehicleNumber" value={form.ParkingVehicleNumber} required={true}/>
//           </div>
//           {/* <div className="col-md-6">
//             <label htmlFor="ParkingVehicleMake" className="form-label">ParkingVehicleMake</label>
//             <input type="text" className="form-control" onChange={handleChange} name="ParkingVehicleMake" value={form.ParkingVehicleMake} id="ParkingVehicleMake" required={true}/>
//           </div> */}
//         </div>
//         <div className="row mb-3">
//           {/* <div className="col-md-6">
//             <label htmlFor="ParkingVehicleModel" className="form-label">ParkingVehicleModel</label>
//             <input type="text" className="form-control" onChange={handleChange} name="ParkingVehicleModel" value={form.ParkingVehicleModel} id="ParkingVehicleModel" required={true}/>
//           </div> */}
//           <div className="col-md-6">
//             <label htmlFor="VehicleID" className="form-label">VehicleID</label>
//             <input type="text" name="VehicleID" onChange={handleChange} value={form.VehicleID} className="form-control" id="JoineeID" required={true}/>
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="JoineeID" className="form-label">JoineeID</label>
//             <select name="JoineeID" onChange={handleChange} value={form.JoineeID} className="btn btn-secondary dropdown-toggle" id="JoineeID" required={true}>
//               <option value="">Select Joinee ID</option>
//               <option value="joinee1">Joinee 1</option>
//               <option value="joinee2">Joinee 2</option>
//               <option value="joinee3">Joinee 3</option>
//             </select>
//           </div>

//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="ParkingCardNumber" className="form-label">ParkingCardNumber</label>
//             <input type="text" className="form-control" onChange={handleChange} name="ParkingCardNumber" value={form.ParkingCardNumber} id="ParkingCardNumber" required={true}/>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary" >Submit</button>
//       </form>
//     </div>
//   </div>
// </div>

//   )

// }
//-----------------------------------------
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function ParkingMaster() {
//     const [form, setForm] = useState({
//         _id: "",
//         ParkingVehicleNumber: "",
//         VehicleID: "",
//         JoineeID: "",
//         ParkingCardNumber: "",
//         CreatedBy: 0,
//         CreatedDate: "",
//         UpdatedBy: 0,
//         UpdatedDate: "",
//         ParkingID: 0,
//         __v: 0
//     });

//     const [vehicles, setVehicles] = useState([]);

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 const response = await fetch('http://192.168.7.187:3000/vehiclemaster');
//                 const data = await response.json();
//                 setVehicles(data);  
//             } catch (error) {
//                 console.error('Error fetching vehicle data:', error);
//             }
//         };

//         fetchVehicles();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://192.168.7.187:3000/park/parkingmaster', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(form),
//             });
//             const result = await response.json();
//             console.log('Form submission response:', result);
//             if (response.status === 201) {
//                 alert("Form submitted successfully");
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//       <div className="container">
//       <div className="card mt-3">
//           <div className="card-body">
//               <legend className="card-title mb-3 text-center">ParkingMaster</legend>
//               <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                   <div className="mb-3">
//                       <label htmlFor="ParkingVehicleNumber" className="form-label">Parking Vehicle Number</label>
//                       <input
//                           type="text"
//                           className="form-control"
//                           onChange={handleChange}
//                           id="ParkingVehicleNumber"
//                           name="ParkingVehicleNumber"
//                           value={form.ParkingVehicleNumber}
//                           required
//                       />
//                   </div>
//                   <div className="mb-3">
//                       <label htmlFor="JoineeID" className="form-label">Joinee ID</label>
//                       <select
//                           name="JoineeID"
//                           onChange={handleChange}
//                           value={form.JoineeID}
//                           className="form-select"
//                           id="JoineeID"
//                           required
//                       >
//                           <option value="">Select Joinee ID</option>
//                           <option value="joinee1">1</option>
//                           <option value="joinee2">2</option>
//                           <option value="joinee3">3</option>
//                           <option value="joinee3">9</option>
//                           <option value="joinee3">87</option>
//                       </select>
//                   </div>
//                   <div className="mb-3">
//                       <label htmlFor="VehicleID" className="form-label">Vehicle ID</label>
//                       <select
//                           name="VehicleID"
//                           onChange={handleChange}
//                           value={form.VehicleID}
//                           className="form-select"
//                           id="VehicleID"
//                           required
//                       >
//                           <option value="">Select Vehicle ID</option>
//                           {vehicles.map(vehicle => (
//                               <option key={vehicle._id} value={vehicle.VehicleID}>
//                                   {vehicle.VehicleManufacturer} {vehicle.VehicleBrand} (ID: {vehicle.VehicleID})
//                               </option>
//                           ))}
//                       </select>
//                   </div>
//                   <div className="mb-3">
//                       <label htmlFor="ParkingCardNumber" className="form-label">Parking Card Number</label>
//                       <input
//                           type="text"
//                           className="form-control"
//                           onChange={handleChange}
//                           name="ParkingCardNumber"
//                           value={form.ParkingCardNumber}
//                           id="ParkingCardNumber"
//                           required
//                       />
//                   </div>
//                   <button type="submit" className="btn btn-primary w-100">Submit</button>
//               </form>
//           </div>
//       </div>
//   </div>
  
//     );
// }
//------------------------------------------
// import React, { useState, useEffect } from 'react';

// export default function ParkingMaster() {
//     const [form, setForm] = useState({
//         _id: "",
//         ParkingVehicleNumber: "",
//         VehicleID: "",
//         JoineeID: "",
//         ParkingCardNumber: "",
//         CreatedBy: 0,
//         CreatedDate: "",
//         UpdatedBy: 0,
//         UpdatedDate: "",
//         ParkingID: 0,
//         __v: 0
//     });

//     const [vehicles, setVehicles] = useState([]);

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 const response = await fetch('http://192.168.7.187:3000/vehiclemaster');
//                 const data = await response.json();
//                 setVehicles(data);  
//             } catch (error) {
//                 console.error('Error fetching vehicle data:', error);
//             }
//         };

//         fetchVehicles();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm(prevForm => ({
//             ...prevForm,
//             [name]: name === "JoineeID" ? parseInt(value, 10) : value // Convert JoineeID to number
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://192.168.7.187:3000/park/parkingmaster', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(form),
//             });
//             const result = await response.json();
//             console.log('Form submission response:', result);
//             if (response.status === 201) {
//                 alert("Form submitted successfully");
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="card mt-3">
//                 <div className="card-body">
//                     <legend className="card-title mb-3 text-center">ParkingMaster</legend>
//                     <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                         <div className="mb-3">
//                             <label htmlFor="ParkingVehicleNumber" className="form-label">Parking Vehicle Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 onChange={handleChange}
//                                 id="ParkingVehicleNumber"
//                                 name="ParkingVehicleNumber"
//                                 value={form.ParkingVehicleNumber}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="JoineeID" className="form-label">Joinee ID</label>
//                             <select
//                                 name="JoineeID"
//                                 onChange={handleChange}
//                                 value={form.JoineeID}
//                                 className="form-select"
//                                 id="JoineeID"
//                                 required
//                             >
//                                 <option value="">Select Joinee ID</option>
//                                 <option value="1">1</option>
//                                 <option value="2">2</option>
//                                 <option value="3">3</option>
//                                 <option value="9">9</option>
//                                 <option value="87">87</option>
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="VehicleID" className="form-label">Vehicle Name</label>
//                             <select
//                                 name="VehicleID"
//                                 onChange={handleChange}
//                                 value={form.VehicleID}
//                                 className="form-select"
//                                 id="VehicleID"
//                                 required
//                             >
//                                 <option value="">Select Vehicle ID</option>
//                                 {vehicles.map(vehicle => (
//                                     <option key={vehicle._id} value={vehicle.VehicleID}>
//                                         {vehicle.VehicleManufacturer} {vehicle.VehicleBrand} (ID: {vehicle.VehicleID})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="ParkingCardNumber" className="form-label">Parking Card Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 onChange={handleChange}
//                                 name="ParkingCardNumber"
//                                 value={form.ParkingCardNumber}
//                                 id="ParkingCardNumber"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary w-100">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ParkingMaster() {
    const [form, setForm] = useState({
        _id: "",
        ParkingVehicleNumber: "",
        VehicleID: "",
        JoineeID: "",
        ParkingCardNumber: "",
        CreatedBy: 0,
        CreatedDate: "",
        UpdatedBy: 0,
        UpdatedDate: "",
        ParkingID: 0,
        __v: 0,
        VehicleManufacturer: "", 
        VehicleBrand: ""
    });

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://192.168.7.187:3000/vehiclemaster');
                const data = await response.json();
                setVehicles(data);  
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleChange = (selectedOption, { name }) => {
        if (name) {
            setForm(prevForm => ({
                ...prevForm,
                [name]: name === "JoineeID" ? parseInt(selectedOption.value, 10) : selectedOption.value
            }));
        } else {
            const selectedVehicle = vehicles.find(vehicle => vehicle.VehicleID === selectedOption.value);
            if (selectedVehicle) {
                setForm(prevForm => ({
                    ...prevForm,
                    VehicleID: selectedOption.value,
                    VehicleManufacturer: selectedVehicle.VehicleManufacturer,
                    VehicleBrand: selectedVehicle.VehicleBrand
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.7.187:3000/park/parkingmaster', {
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

    const vehicleOptions = vehicles.map(vehicle => ({
        value: vehicle.VehicleID,
        label: `${vehicle.VehicleManufacturer} ${vehicle.VehicleBrand}`
    }));

    return (
        <div className="container">
            <div className="card mt-3">
                <div className="card-body">
                    <legend className="card-title mb-3 text-center">ParkingMaster</legend>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="ParkingVehicleNumber" className="form-label">Parking Vehicle Number</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={e => setForm(prevForm => ({ ...prevForm, ParkingVehicleNumber: e.target.value }))}
                                id="ParkingVehicleNumber"
                                name="ParkingVehicleNumber"
                                value={form.ParkingVehicleNumber}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="JoineeID" className="form-label">Joinee</label>
                            <select
                                name="JoineeID"
                                onChange={e => handleChange({ value: e.target.value }, { name: "JoineeID" })}
                                value={form.JoineeID}
                                className="form-select"
                                id="JoineeID"
                                required
                            >
                                <option value="">Select Joinee</option>
                                <option value="1">Suvam</option>
                                <option value="2">Swayam</option>
                                <option value="3">Suvendu</option>
                                <option value="9">Subhasis</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="VehicleID" className="form-label">Vehicle Name</label>
                            <Select
                                name="VehicleID"
                                value={form.VehicleID ? vehicleOptions.find(option => option.value === form.VehicleID) : null}
                                onChange={(selectedOption) => handleChange(selectedOption, { name: 'VehicleID' })}
                                options={vehicleOptions}
                                placeholder={form.VehicleID ? `${form.VehicleManufacturer} ${form.VehicleBrand}` : "Select Vehicle"}
                                isSearchable
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ParkingCardNumber" className="form-label">Parking Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={e => setForm(prevForm => ({ ...prevForm, ParkingCardNumber: e.target.value }))}
                                name="ParkingCardNumber"
                                value={form.ParkingCardNumber}
                                id="ParkingCardNumber"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}




