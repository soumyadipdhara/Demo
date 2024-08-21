import React, { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SkillForm({onFormSubmit}) {
  const [formData, setFormData] = useState({
    SkillClass: "",
    SkillPractice: "",
    SkillSubPractice: "",
    SkillDesc: "",
    PracticeManagerIDUSEmpID: "",
    PracticeManagerIDINEmpID: "",
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
      const response = await fetch('http://localhost:3000/Skills');
      const data = await response.json();
      setRelationshipData(data);
    } catch (error) {
      console.error('Error fetching relationship data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
    const response = await axios.post("http://192.168.7.187:3000/skills/add" , formData ,{
      headers :{
        "Content-Type" : "application/json",
      },


    });
    console.log("Form submission response:" , response.data);
    onFormSubmit();
    toast.success("Skill added successfully");
   } catch(error){
    toast.error("Error in skill submission");
    console.error("Error submitting form:", error);
   }
  };

  return (
    <div>
      <ToastContainer/>
    <section id="client" className="card" style={{ border: "none" }}>
      <h2>Skills Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="label">
          <label>
            SkillClass:<br></br>
            <input
              className="styled-input"
              type="text"
              name="SkillClass"
              value={formData.SkillClass}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label">
          <label>
            Practice:<br></br>
            <input
              className="styled-input"
              type="text"
              name="SkillPractice"
              value={formData.SkillPractice}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label">
          <label>
            SubPractice:<br></br>
            <input
              className="styled-input"
              type="text"
              name="SkillSubPractice"
              value={formData.SkillSubPractice}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label">
          <label>
            SkillDesc:<br></br>
            <input
              className="styled-input"
              type="text"
              name="SkillDesc"
              value={formData.SkillDesc}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label">
          <label>
            PracticeManagerIDUS:<br></br>
            <input
              className="styled-input"
              type="number"
              name="PracticeManagerIDUSEmpID"
              value={formData.PracticeManagerIDUSEmpID}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="label">
          <label>
            PracticeManagerIDIN:<br></br>
            <input
              className="styled-input"
              type="number"
              name="PracticeManagerIDINEmpID"
              value={formData.PracticeManagerIDINEmpID}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </section>

    <br/>
    <h3>Skill Details</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Skill ID</th>
            <th>Skill Class</th>
            <th>Skill Practice</th>
            <th>Skill Sub Practice</th>
            <th>Skill Description</th>
          </tr>
        </thead>
        <tbody>
          {relationshipData.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.SkillClass}</td>
              <td>{item.SkillPractice}</td>
              <td>{item.SkillSubPractice}</td>
              <td>{item.SkillDesc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkillForm;
