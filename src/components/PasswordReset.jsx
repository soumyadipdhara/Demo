
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
function PasswordReset({ open, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
 
  useEffect(() => {
    // Check token and update password change status on mount
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsPasswordChanged(decodedToken.PasswordChanged || false);
      } catch (e) {
        console.error("Failed to decode token:", e);
      }
    }
  }, [open]);
 
  const handleReset = async () => {
    const token = localStorage.getItem("token")?.trim();
 
    if (!token) {
      setError("Authentication error, please login again.");
      return;
    }
 
    try {
      const decodedToken = jwtDecode(token);
      const userID = decodedToken.UserID;
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
 
      const response = await axios.post(
       "http://192.168.7.187:3000/users/changePassword",
        {
          UserID: userID,
          Password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      if (response.status === 200) {
        toast.success("Password reset successfully");
        onClose();
      } else {
        toast.error(response.data.message || "Error resetting the password");
      }
    } catch (error) {
      console.error("Error resetting the password:", error);
      setError("Error resetting the password, please try again later");
      toast.error("Error resetting the password, please try again later");
    }
  };
 
  return (
    <Dialog open={open && !isPasswordChanged}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="primary">
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
 
export default PasswordReset;