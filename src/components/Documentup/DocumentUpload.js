import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaTimes } from 'react-icons/fa';
import '../Documentup/DocumentUpload.css';
 
const documentTypeMapping = {
  'Personal Photo': 1,
  'Signature': 2,
  'Passport': 3,
  'Aadhar Card': 4,
  'PAN Card': 5,
  'VISA': 6,
  'X Marksheet': 7,
  'XII Marksheet': 8,
  'Graduation Marksheet': 9,
  'Post Graduation Marksheet': 10,
  'Releasing Letter': 11,
  'Experience Letter': 12,
  'Certificate': 13,
  'Others': 14,
};
 
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
 
const DocumentUpload = ({ documentType = 'Others', isEditable = true }) => {
  const [idNumber, setIdNumber] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSizeError, setIsSizeError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const userId = '2';
 
  useEffect(() => {
    const lowerDocumentType = documentType.toLowerCase();
    if (['personal photo', 'signature', 'others', 'releasing letter', 'experience letter'].includes(lowerDocumentType)) {
      setIdNumber(`USER${userId}`);
    } else {
      setIdNumber('');
    }
 
    const savedIdNumber = localStorage.getItem(`${documentType}-idNumber`) || '';
    const savedFileName = localStorage.getItem(`${documentType}-fileName`);
    const savedFilePreview = localStorage.getItem(`${documentType}-filePreview`);
    const savedFileType = localStorage.getItem(`${documentType}-fileType`);
    setIdNumber(savedIdNumber);
    if (savedFileName && savedFilePreview) {
      setFile({ name: savedFileName, type: savedFileType });
      setPreview(savedFilePreview);
    }
  }, [documentType, userId]);
 
  const validateIdNumber = (idNumber) => {
    const errors = {};
    const docType = documentType.toLowerCase();
 
    switch (docType) {
      case 'aadhar card':
        if (!/^\d{12}$/.test(idNumber)) {
          errors.idNumber = 'Aadhar Number must be exactly 12 digits.';
        }
        break;
      case 'pan card':
        if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(idNumber)) {
          errors.idNumber = 'PAN Number must be exactly 10 alphanumeric characters with the format AAAAA9999A.';
        }
        break;
      case 'passport':
        if (!/^[A-Z]{1}[0-9]{7,9}$/.test(idNumber)) {
          errors.idNumber = 'Passport Number must start with a letter followed by 7 to 9 digits.';
        }
        break;
      case 'visa':
        if (!/^[A-Z0-9]{1,15}$/.test(idNumber)) {
          errors.idNumber = 'VISA Number must be 1 to 15 alphanumeric characters.';
        }
        break;
      case 'x marksheet':
      case 'xii marksheet':
      case 'graduation marksheet':
      case 'post graduation marksheet':
        if (!/^\d+$/.test(idNumber)) {
          errors.idNumber = 'Roll Number must be a number.';
        }
        break;
      default:
        break;
    }
 
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
 
  const onDrop = async (acceptedFiles) => {
    if (!isEditable) return; // Do nothing if not editable
 
    const file = acceptedFiles[0];
 
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setIsSizeError(true);
      return;
    }
    setIsSizeError(false);
 
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    localStorage.setItem(`${documentType}-filePreview`, previewUrl);
    localStorage.setItem(`${documentType}-fileName`, file.name);
    localStorage.setItem(`${documentType}-fileType`, file.type);
 
    const documentTypeId = documentTypeMapping[documentType] || null;
 
    if (!validateIdNumber(idNumber) || isSizeError) {
      return;
    }
 
    const formData = new FormData();
    formData.append('DocTypeID', documentTypeId);
    formData.append('documentType', documentType);
    formData.append('IDNumber', idNumber);
    formData.append('DocScanned', file);
 
    try {
      const response = await fetch('http://192.168.7.187:3000/documentTran/add', {
        method: 'POST',
        body: formData,
      });
 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
 
  const handleIdNumberChange = (e) => {
    if (!isEditable) return; // Do nothing if not editable
 
    const newIdNumber = e.target.value;
 
    const numericValue = ['aadhar card', 'x marksheet', 'xii marksheet', 'graduation marksheet', 'post graduation marksheet'].includes(documentType.toLowerCase())
      ? newIdNumber.replace(/[^0-9]/g, '')
      : newIdNumber;
 
    setIdNumber(numericValue);
    if (validateIdNumber(numericValue)) {
      localStorage.setItem(`${documentType}-idNumber`, numericValue);
    } else {
      localStorage.removeItem(`${documentType}-idNumber`);
    }
  };
 
  const handleRemoveFile = (e) => {
    if (!isEditable) return; // Do nothing if not editable
 
    e.stopPropagation();
    setFile(null);
    setPreview('');
    setIsSizeError(false);
    localStorage.removeItem(`${documentType}-fileName`);
    localStorage.removeItem(`${documentType}-filePreview`);
  };
 
  const handleFilePreviewClick = () => {
    if (preview) {
      window.open(preview, '_blank');
    } else {
      console.warn('No preview URL available');
    }
  };
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach(file => {
        console.warn(`Skipped "${file.name}" because ${file.errors[0].code}`);
        if (file.errors[0].code === 'file-too-large') {
          setIsSizeError(true);
        }
      });
    },
  });
 
  const getLabel = () => {
    switch (documentType.toLowerCase()) {
      case 'aadhar card':
        return 'Aadhar Number';
      case 'pan card':
        return 'PAN Number';
      case 'x marksheet':
        return '10th Marksheet Roll Number';
      case 'xii marksheet':
        return '12th Marksheet Roll Number';
      case 'graduation marksheet':
        return 'Graduation Roll Number';
      case 'post graduation marksheet':
        return 'Post Graduation Roll Number';
      case 'passport':
        return 'Passport Number';
      case 'visa':
        return 'VISA Number';
      default:
        return 'ID Number';
    }
  };
 
  const shouldShowIdNumberInput = !['personal photo', 'signature', 'others', 'releasing letter', 'experience letter'].includes(documentType.toLowerCase());
 
  return (
<>
<div className="form-header">
        {shouldShowIdNumberInput && (
<div className="input-group">
<label htmlFor="idNumber" className="required">{getLabel()}</label>
<input
              type={['aadhar card', 'x marksheet', 'xii marksheet', 'graduation marksheet', 'post graduation marksheet'].includes(documentType.toLowerCase()) ? 'number' : 'text'}
              id="idNumber"
              value={idNumber || ''} // Ensuring the value is always a string
              onChange={handleIdNumberChange}
              required
              pattern="[0-9]*"
              disabled={!isEditable}
            />
            {errors.idNumber && <span className="error-message">{errors.idNumber}</span>}
</div>
        )}
</div>
 
      <div className="form-body">
<div className="dropzone-container">
<div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
<input {...getInputProps()} disabled={!isEditable} />
<div className="icon">
<FaFileUpload size={40} />
<p>{isEditable ? 'Drag & drop a file here, or click to select a file' : 'File upload disabled'}</p>
</div>
</div>
 
          {isSizeError && <div className="size-error">File size exceeds 2 MB. Please select a smaller file.</div>}
</div>
 
        {file && (
<div className="file-preview" onClick={handleFilePreviewClick}>
            {file.type.startsWith('image/') ? (
<img src={preview} alt="Preview" className="preview-image" />
            ) : file.type === 'application/pdf' ? (
<iframe
                src={preview}
                title="PDF Preview"
                className="preview-iframe"
                style={{ pointerEvents: 'none' }}
></iframe>
            ) : (
<div className="preview-icon">
<FaFileUpload size={40} />
<p>{file.name}</p>
</div>
            )}
            {isEditable && <FaTimes className="remove-icon" onClick={handleRemoveFile} />}
</div>
        )}
</div>
</>
  );
};
 
export default DocumentUpload;