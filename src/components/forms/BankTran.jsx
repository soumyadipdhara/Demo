import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function BankTranForm() {
  const [formData, setFormData] = useState({
    BankID: "",
    JoineeID: "",
    EmploymentTypeID: "",
    BankNameID: "",
    BankIFSC: "",
    BankAccHolderName: "",
    BankAccNumber: "",
    DocID: ""
  });

  const [bankData, setBankData] = useState([]);


  const[employmentTypes,setEmploymentTypes]=useState([]);

  const[documentId,setDocumentId]=useState([]);

  const [bankNames,setBankNames]=useState([]);


  const [bankDetails,setBankDetails]=useState({});
  const [isBankValid,setIsBankValid]=useState(false);



  useEffect(() => {
    fetchBankData();
    fetchEmploymentTypes();
    fetchDocumentId();
    fetchBankNames();
    fetchBankDetails();
  }, []);

  const fetchBankData = async () => {
    try {
      const response = await fetch("http://localhost:3000/BankTran");
      const Data = await response.json();
      setBankData(bankData);
    } catch (error) {
      console.error("Error fetching bank data:", error);
    }
  };

  const fetchEmploymentTypes = async() =>{
    try{
      const response = await fetch("http://localhost:3000/employement-type");
      const data = await response.json();
      setEmploymentTypes(data);
    }catch(error){
      console.error("Error fetching employment types",error);
    }
  };
  
  const fetchDocumentId = async() =>{
    try{
      const response = await fetch("http://localhost:3000/documenttype/getDocumentType");
      const data = await response.json();
      setDocumentId(data);
    }catch(error){
      console.error("Error in fetching document ids",error);
    }
  };

  const fetchBankNames = async () => {
    try {
      const response = await fetch("http://localhost:3000/bank/getBankNameDetails");
      const data = await response.json();
      setBankNames(data);
    } catch (error) {
      console.error("Error fetching bank names:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "BankIFSC") {
      fetchBankDetails(value);
    }
  };

  const handleBlur = async () => {
    const ifsc = formData.BankIFSC;
    await fetchBankDetails(ifsc);
  };

  const fetchBankDetails = async (ifsc) => {
    if (!ifsc || ifsc.length !==11) {
      setBankDetails({});
      setIsBankValid(false);
      return;
    }

    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (response.ok) {
        const data = await response.json();
        setBankDetails(data);
        setIsBankValid(true);
      } else {
        throw new Error("Bank not found");
      }
    } catch (error) {
      setBankDetails({});
      setIsBankValid(false);
      toast.error("Invalid IFSC code or bank not found");
      console.error("Error fetching bank details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/BankTran/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log("Form submission response:", result);
      if (response.status === 201) {
        toast.success("Bank transaction added successfully");
        fetchBankData(); // Refresh the bank data
      } else {
        toast.error("Error submitting form: " + result.message);
      }
    } catch (error) {
      toast.error("Error submitting form: " + error.message);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section id="bank-tran" className="card" style={{ border: "none" }}>
        <h2>Bank Transaction </h2>
        <form className="form" onSubmit={handleSubmit}>
          
          <div className="label">
            <label htmlFor="JoineeID" className="label">Joinee ID:</label><br />
            <select
              className="styled-input"
              type="number"
              name="JoineeID"
              id="JoineeID"
              value={formData.JoineeID}
              onChange={handleChange}
              required
            >
              <option value="">Select Joinee </option>
              <option value="1">Suvam</option>
              <option value="2">Rahul</option>
              <option value="3">Manoj</option>
              <option value="4">Swagat</option>
            </select>
          </div>
          <div className="label">
            <label htmlFor="EmploymentTypeID" className="label">Employment Type ID:</label><br />
            <select
              className="styled-input"
              name="EmploymentTypeID"
              id="EmploymentTypeID"
              value={formData.EmploymentTypeID}
              onChange={handleChange}
              required
            >
              <option value="">Select Employment Type</option>
              {employmentTypes.map((type) => (
                <option key={type.EmploymentTypeID} value={type.EmploymentTypeID}>
                  {type.EmploymentTypeID}<p>.</p> {type.EmploymentTypeDesc}
                </option>
              ))}
            </select>
          </div>
          <div className="label">
            <label htmlFor="BankNameID" className="label">Bank Name ID:</label><br />
            <select
              className="styled-input"
              type="number"
              name="BankNameID"
              id="BankNameID"
              value={formData.BankNameID}
              onChange={handleChange}
              required
            >
              <option value="">Select Bank Name</option>
              {bankNames.map((bank) => (
                <option key={bank.BankNameID} value={bank.BankNameID}>
                  {bank.BankName}
                </option>
              ))}
            </select>
          </div>
          <div className="label">
            <label htmlFor="BankIFSC" className="label">Bank IFSC:</label><br />
            <input
              className="styled-input"
              type="text"
              name="BankIFSC"
              id="BankIFSC"
              value={formData.BankIFSC}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          {isBankValid && (
            <div className="bank-details d-flex align-items-center mt-3">
            <span className="bank-info me-3">
              <i className="fas fa-check-circle text-success me-1"></i>
              <strong>Bank Name:</strong> {bankDetails.BANK}
            </span>
            <span className="bank-info">
              <i className="fas fa-check-circle text-success me-1"></i>
              <strong>Branch:</strong> {bankDetails.BRANCH}
            </span>
          </div>
          )}
          
          <div className="label">
            <label htmlFor="BankAccHolderName" className="label">Bank Account Holder Name:</label><br />
            <input
              className="styled-input"
              type="text"
              name="BankAccHolderName"
              id="BankAccHolderName"
              value={formData.BankAccHolderName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
            <label htmlFor="BankAccNumber" className="label">Bank Account Number:</label><br />
            <input
              className="styled-input"
              type="text"
              name="BankAccNumber"
              id="BankAccNumber"
              value={formData.BankAccNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
            <label htmlFor="DocID" className="label">Document ID:</label><br />
            <select
              className="styled-input"
              type="number"
              name="DocID"
              id="DocID"
              value={formData.DocID}
              onChange={handleChange}
              required
            >
             <option value="">Select Document IDs</option>
              {documentId.map((type) => (
                <option key={type.DocID} value={type.DocID}>
                  {type.DocTypeID}<p>.</p> {type.DocType}
                </option>
              ))} 
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>

      <br /><br />

      
    </div>
  );
}

export default BankTranForm;
