import React, { useEffect, useState } from "react";
import SideNavBar from "./SideNavBar";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { Export } from "@phosphor-icons/react/dist/ssr";
import { Email } from "@mui/icons-material";
import DocumentUpload from "../components/Documentup/DocumentUpload";
 
function CandidatesList() {
  const [candidates, setCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem("candidates");
    return storedCandidates
      ? JSON.parse(storedCandidates)
      : [];
  });
 
  const [statusMessages, setStatusMessage] = useState(() => {
    const storedMessages = localStorage.getItem("statusMessages");
    return storedMessages ? JSON.parse(storedMessages) : {};
  });
 
  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDocumentUpload, setShowDocumentUpload] = useState({}); // State to manage DocumentUpload visibility
 
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);
 
  useEffect(() => {
    localStorage.setItem("statusMessages", JSON.stringify(statusMessages));
  }, [statusMessages]);
 
  const handleGeneratePassword = async (index) => {
    const candidate = candidates[index];
    const { FirstName, MiddleName, LastName, Email } = candidate;
    const token = localStorage.getItem("token");
 
    try {
      const response = await axios.post(
        "http://192.168.7.187:3000/users/sendcode",
        { FirstName, MiddleName, LastName, Email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      if (response.status === 200) {
        setStatusMessage((prevMessages) => ({
          ...prevMessages,
          [index]: "Password sent Successfully",
        }));
        setShowDocumentUpload((prev) => ({
          ...prev,
          [index]: true, // Show DocumentUpload for this candidate
        }));
      } else {
        setStatusMessage((prevMessages) => ({
          ...prevMessages,
          [index]: "Failed to send Password",
        }));
      }
    } catch (error) {
      setStatusMessage((prevMessages) => ({
        ...prevMessages,
        [index]: "Error sending password",
      }));
    }
  };
 
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
 
        if (parsedData.length > 1 && Array.isArray(parsedData[0])) {
          const newCandidates = parsedData.slice(1).map((row) => ({
            FirstName: row[0] || "",
            MiddleName: row[1] || "",
            LastName: row[2] || "",
            Email: row[3] || "",
          }));
 
          const uniqueCandidates = newCandidates.filter(
            (newCandidate) =>
              !candidates.some(
                (candidate) =>
                  candidate.FirstName === newCandidate.FirstName &&
                  candidate.MiddleName === newCandidate.MiddleName &&
                  candidate.LastName === newCandidate.LastName &&
                  candidate.Email === newCandidate.Email
              )
          );
 
          setCandidates((prevCandidates) => [
            ...prevCandidates,
            ...uniqueCandidates,
          ]);
        } else {
          console.error("Invalid data format in the Excel file.");
        }
      } catch (error) {
        console.error("Error parsing the Excel file:", error);
      }
    };
 
    reader.readAsArrayBuffer(file);
  };
 
  const handleDocumentUpload = (index, event) => {
    const file = event.target.files[0];
    console.log(`Uploading document for candidate ${index}:`, file);
  };
 
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCandidates(new Set(candidates.map((_, index) => index)));
    } else {
      setSelectedCandidates(new Set());
    }
  };
 
  const handleSelectOne = (index) => {
    setSelectedCandidates((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };
 
  const isAllSelected =
    candidates.length > 0 && selectedCandidates.size === candidates.length;
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  return (
    <div className="preboarding" style={{ display: "flex" }}>
      <div className="sidebar col-2">
        <SideNavBar />
      </div>
      <div
        className="main-content col-10 "
        style={{ flexGrow: 1, padding: "16px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <label
            htmlFor="upload-button-file"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              accept=".xlsx, .xls"
              id="upload-button-file"
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<Export />}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#415a77",
                "&:hover": {
                  backgroundColor: "#1b263b",
                },
                color: "white",
                borderRadius: 4,
              }}
            >
              Import
            </Button>
          </label>
        </Box>
        <Card sx={{ borderRadius: 4 }}>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: "800px" }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      inputProps={{ "aria-label": "select all candidates" }}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Upload Documents</TableCell>
                </TableRow>
              </TableHead>
 
              <TableBody>
                {candidates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((candidate, index) => (
                    <TableRow
                      hover
                      key={index}
                      selected={selectedCandidates.has(index)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCandidates.has(index)}
                          onChange={() => handleSelectOne(index)}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack
                          sx={{ alignItems: "center" }}
                          direction="row"
                          spacing={2}
                        >
                          <Avatar />
                          <Typography variant="subtitle2">
                            {candidate.FirstName} {candidate.MiddleName}{" "}
                            {candidate.LastName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{candidate.Email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleGeneratePassword(index)}
                          sx={{
                            backgroundColor: "#415a77",
                            "&:hover": {
                              backgroundColor: "#1b263b",
                            },
                          }}
                        >
                          Generate Password
                        </Button>
                      </TableCell>
                      <TableCell>{statusMessages[index]}</TableCell>
                      <TableCell>
                        {showDocumentUpload[index] && ( // Conditionally render DocumentUpload
                          <DocumentUpload
                            onUpload={(event) => handleDocumentUpload(index, event)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
          <Divider />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={candidates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </div>
  );
}
 
export default CandidatesList;