import React,{ useState} from 'react'

export default function RelationshipMaster() {
  
  const [formData, setFormData] =useState({        
    _id:'',
    RelationshipDesc:'',
    RelationshipID:'',
    __v:''
  });
  const handleChange=(e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  };
  const handleSubmit = async(e) => {
         e.preventDefault();        
try{            
  const response = await fetch('http://localhost:3000/relationships/add', {                
    method:'POST',                
    headers: {                    
  'Content-Type':'application/json',       
},               
body:JSON.stringify(formData),            
 });           
const result = await response.json();
console.log('Form submission response:', result);
if (response.status===201){
  alert("form submited sucessfully");
}
}
catch(error) { console.error('Error submitting form:', error); } };
  return (
    <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <legend className='my-5'>RelationshipMaster</legend>
            
            <div className="mb-3">
            <label htmlFor="RelationshipDesc" className="form-label">RelationshipDesc</label>
            <input type="text" name='RelationshipDesc' className="form-control" id="RelationshipDesc" required={true} value={formData.RelationshipDesc} onChange={handleChange} />
            </div>

            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

