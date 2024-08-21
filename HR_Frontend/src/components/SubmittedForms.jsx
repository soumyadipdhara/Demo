import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SideNavBar from "./SideNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function SubmittedForms() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.7.187:3000/personaldetails/fetchTheUserWhoSubmittedThePersonalDetails"
        );
        console.log(response.data);
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
 
    fetchData();
  }, []);
 
  const handleRowClick = (userId) => {
    navigate(`/view-submitted-form/${userId}`);
  };
 
  return (
    <div style={{ display: "flex" }}>
      <div className="sidenav col-2">
        <SideNavBar />
      </div>
      <div
        className="main-content col-10"
        style={{ flexGrow: 1, padding: "20px" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>MiddleName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.UserID} onClick={() => handleRowClick(row.UserID)} style={{ cursor: 'pointer' }}>
                  <TableCell>{row.FirstName}</TableCell>
                  <TableCell>{row.MiddleName}</TableCell>
                  <TableCell>{row.LastName}</TableCell>
                  <TableCell>{row.User.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
 
export default SubmittedForms;