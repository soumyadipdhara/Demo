import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DataTable({apiUrl , headers , columns , refresh , onRowClick}) {
const [tableData , setTableData] = useState([]);

useEffect(()=>{
    
    fetchTableDta();
} , [refresh]);

const fetchTableDta = async()=>{
    try{
        const response = await axios.get(apiUrl);
      
        if(response.status !== 200){
            throw new Error("Failed to fetch data");
        }
        console.log('Fetched data:', response.data); 
        setTableData(response.data);
    }catch(error){
        console.error("Error fetching tabale data" , error);
    }

    
};

const handleRowClick =(rowData) =>{
  if(onRowClick){
    onRowClick(rowData);
    console.log('row clicked'  , rowData);
  }
};

const renderTableHeaders =() =>(
    <thead>
        <tr>
            {headers.map((header , index)=>(
                <th key={index}>{header}</th>
            ))}
        </tr>
    </thead>
);
const renderTableRows = () => (
    <tbody>
      {tableData.map((item, index) => (
        <tr key={index} onClick={() => handleRowClick(item)}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>{item[column]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );


  return (
    <div className='tbl-container' >
        <table className='table-container'>
            {renderTableHeaders()}
            {renderTableRows()}
        </table>
    </div>
  )
}

export default DataTable