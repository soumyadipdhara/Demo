
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'; 

const RepliconMaster = () => {
  const [form, setForm] = useState({
    _id: "",
    RepliconID: 0,
    JoineeID: "",
    RepliconCreated: false,
    RepliconSystemID: "",
    RepliconComments: "",
    CreatedBy: 0,
    CreatedDate: "",
    UpdatedBy: 0,
    UpdatedDate: ""
  });

  const [repliconData, setRepliconData] = useState([]);

  useEffect(() => {
    fetchRepliconData();
  }, []);

  const fetchRepliconData = async () => {
    try {
      const response = await fetch('http://localhost:3000/replicons');
      const data = await response.json();
      setRepliconData(data);
    } catch (error) {
      console.error('Error fetching replicon data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm({
      ...form,
      [name]: newValue
    });
  };

  const handleSelectChange = (name, selectedOption) => {
    setForm({
      ...form,
      [name]: selectedOption ? selectedOption.value : ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/replicons/add', {
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
        fetchRepliconData(); 
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  
  const joineeOptions = [
    { value: '1', label: 'Suvam' },
    { value: '2', label: 'Swayam' },
    { value: '3', label: 'Suvendu' },
    { value: '9', label: 'Subhasis' }
  ];

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <legend className="card-title mb-4">Replicon Master</legend>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="JoineeID" className="form-label">Joinee</label><br />
                <Select
                  options={joineeOptions}
                  onChange={(selectedOption) => handleSelectChange('JoineeID', selectedOption)}
                  value={joineeOptions.find(option => option.value === form.JoineeID)}
                  placeholder="Joinee"
                  isSearchable
                  required
                />
              </div>
              <div className="col-md-6 my-5">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" name="RepliconCreated" id="RepliconCreated" checked={form.RepliconCreated} onChange={handleChange} />
                  <label className="form-label" htmlFor="RepliconCreated">
                    Replicon Created
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="RepliconSystemID" className="form-label">Replicon System ID</label><br />
                <Select
                  options={[
                    { value: 'RepliconSystemID1', label: 'RepliconSystemID 1' },
                    { value: 'RepliconSystemID2', label: 'RepliconSystemID 2' },
                    { value: 'RepliconSystemID3', label: 'RepliconSystemID 3' }
                  ]}
                  onChange={(selectedOption) => handleSelectChange('RepliconSystemID', selectedOption)}
                  value={form.RepliconSystemID ? { value: form.RepliconSystemID, label: form.RepliconSystemID } : null}
                  placeholder="Replicon System ID"
                  isSearchable
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="RepliconComments" className="form-label">Replicon Comments</label>
                <input type="text" className="form-control" name="RepliconComments" value={form.RepliconComments}
                  onChange={handleChange} id="RepliconComments" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h3>Replicon Master Data</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Replicon ID</th>
              <th>Joinee ID</th>
              <th>Replicon System ID</th>
              <th>Replicon Comments</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Updated By</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {repliconData.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.RepliconID}</td>
                <td>{item.JoineeID}</td>
                <td>{item.RepliconSystemID}</td>
                <td>{item.RepliconComments}</td>
                <td>{item.CreatedBy}</td>
                <td>{item.CreatedDate}</td>
                <td>{item.UpdatedBy}</td>
                <td>{item.UpdatedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepliconMaster;




