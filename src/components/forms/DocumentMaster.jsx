import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DocumentMaster = ({documentType, onDocumentUpload}) => {
  const [form, setForm] = useState({
    DocTypeID: "",
    IDNumber: "",
    PreOnBoardingID: 1005,
    CreatedBy: "",
    UpdatedBy: "",
  });
  const [file, setFile] = useState(null);
  const [documentTypes, setDocumentTypes] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch document types from API when component mounts
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get(
          "http://192.168.7.187:3000/documenttype/getDocumentType"
        );
        setDocumentTypes(response.data);
      } catch (error) {
        console.error("Error fetching document types:", error);
        toast.error("Error fetching document types.");
      }
    };

    fetchDocumentTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("DocTypeID", form.DocTypeID);
    formData.append("IDNumber", form.IDNumber);
    formData.append("PreOnBoardingID", form.PreOnBoardingID);
    formData.append("CreatedBy", form.CreatedBy);
    formData.append("UpdatedBy", form.UpdatedBy);

    try {
      const response = await axios.post(
        "http://192.168.7.187:3000/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Form submission response:", response.data);

      toast.success("Document uploaded successfully!");

      onDocumentUpload(documentType);
      // Reset the form, file state, and file input
      setForm({
        DocTypeID: "",
        IDNumber: "",
        PreOnBoardingID: 1005,
        CreatedBy: "",
        UpdatedBy: "",
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error uploading document. Please try again.");
    }
  };

  return (
    <div className="mx-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2>Document Upload</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="DocTypeID">Document Type:</label>
                <div className="input-group">
                  <span className="input-group-text" id="info1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                  </span>
                  <select
                    className="form-control"
                    name="DocTypeID"
                    value={form.DocTypeID}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Document Type
                    </option>
                    {documentTypes.map((docType) => (
                      <option key={docType.DocTypeID} value={docType.DocTypeID}>
                        {docType.DocType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="IDNumber">ID Number:</label>
                <div className="input-group">
                  <span className="input-group-text" id="info1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="IDNumber"
                    name="IDNumber"
                    value={form.IDNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="DocScanned">Upload Document:</label>
                <div className="input-group">
                  <span className="input-group-text" id="info1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    id="DocScanned"
                    name="DocScanned"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentMaster;
