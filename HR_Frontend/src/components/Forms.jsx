import React, { useState } from "react";
import FormsSidebar from "./FormsSidebar";
import SkillForm from "./forms/SkillForm";
import ClientForm from "./forms/ClientForm";
import RelationshipForm from "./forms/RelationshipForm";
import PracticeMaster from "./forms/PracticeMaster";
import AddressMaster from "./forms/AddressMaster";
import DesignationMaster from "./forms/DesignationMaster";
import PassportMaster from "./forms/PassportMaster";
import LinkedInMaster from "./forms/LinkedinMaster";
import InsuranceMaster from "./forms/InsuranceMaster";
import EmploymentTypeMaster from "./forms/EmploymentTypeMaster";
import DocumentMaster from "./forms/DocumentMaster"; 
import HireMaster from "./forms/HireMater";
import RelationshipMaster from "./forms/RelationshipMaster";
import EmergencyContactMaster from "./forms/EmergencyContactMaster";
import SourceMaster from "./forms/SourceMaster";
import DataTable from "./DataTable";
import RepliconMaster from "./forms/RepliconMaster";
import ParkingMaster from "./forms/ParkingMaster";
import BankNameDetailsMaster from "./forms/BankNameDetailsMaster";
import BankTran from "./forms/BankTran";
// import JoineeDetails from "./forms/Joinee_Master";

function Forms() {
  const [activeForm, setActiveForm] = useState('skills');
  const[refresh, setRefresh] = useState(false);

  const tablesConfig ={
    skills: {
      //apiUrl:'http://192.168.7.187:3000/skills',
      headers:[
        "Skill ID",
       "Skill Class",
        "Skill Practice",
        "Skill Sub Practice",
        "Skill Description",
        
      ],
      columns :[
        "SkillID",
        "SkillClass",
        "SkillPractice",
        "SkillSubPractice",
        "SkillDesc",
        
      ]

    },
  };

  const handdleFormSubmit =()=>{
    setRefresh(!refresh);
  }

  const renderFormContent = () => {
    switch (activeForm) {
      case "skills":
        return (
          <>
            <SkillForm  onFormSubmit={handdleFormSubmit}/>
            {/* <DataTable className="table-container"
              apiUrl={tablesConfig.skills.apiUrl}
              headers={tablesConfig.skills.headers}
              columns={tablesConfig.skills.columns}/> */}
              
          </>
        );
      case "client":
        return <ClientForm/>;
      case "practice":
        return <PracticeMaster/>;
        // case "joinee":
        // return <JoineeDetails/>;
      case "passport":
        return <PassportMaster />;
      case "relationship":
        return (
          <div>
            <RelationshipForm />
          </div>
        );
      case "employee":
        return <div>Employee Form</div>;
      case "address":
        return <AddressMaster />;
      case "recruiter":
        return <div>Recruiter Form</div>;
      case "source":
        return <SourceMaster/>;
      case "parking":
        return <ParkingMaster/>
      case "emergencycontact":
        return <EmergencyContactMaster/>;
      case "designation":
        return <DesignationMaster />;
      case "insurance":
        return <InsuranceMaster />;
      case "employmenttype":
        return <EmploymentTypeMaster/>;
      case "linkedin":
        return <LinkedInMaster />;
        case "replicon":
          return <RepliconMaster />;
      case "bank":
        return <BankNameDetailsMaster/>
      case "BankTran":
          return <BankTran/>
      case "documents":
        return <DocumentMaster />;
      case "hire":
        return <HireMaster />;
      case "Relationship":
        return <RelationshipMaster />;
      default:
        // return <div>Select an option from the sidebar</div>;
        return (
          <>
            <SkillForm />
          </>
        );
    }
  };

  return (
    <div className="forms">
      <FormsSidebar setActiveForm={setActiveForm} />
      <div className="forms-content col-10">
        {renderFormContent()}
       
      </div>
    </div>
  );
}

export default Forms;
