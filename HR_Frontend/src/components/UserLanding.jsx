
import { useContext, useEffect, useState } from "react";
import MianNav from "./MianNav";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { UserContext } from "./context/UserContext";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import PasswordReset from "./PasswordReset";
import JoineePage from "../pages/JoineePage";
 
function UserLanding() {
  const { user } = useContext(UserContext);
  // console.log(user);
  const navigate = useNavigate();
  const [showPasswordReset, setShowPasswordReset] = useState(false);
 
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      // If password has not been changed, show the password reset dialog
      setShowPasswordReset(decodedToken.PasswordChanged ? false : true);
      // console.log(showPasswordReset);
    }
  }, [user]);
 
  const handleOnboardingClick = () => {
    navigate("/JoineePage");
  };
 
  return (
    <>
      <MianNav />
      <PasswordReset
        open={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // Apply blur and pointer events based on `showPasswordReset`
          filter: showPasswordReset ? "blur(5px)" : "none",
          pointerEvents: showPasswordReset ? "none" : "auto",
          padding: 2,
        }}
      >
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: "1200px",
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#f8f9f9",
            marginBottom: 4,
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
        >
          <Avatar
            src={avatar}
            sx={{ width: 60, height: 60, margin: "0 auto 16px" }}
          />
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            variant="h5"
            sx={{ marginBottom: 2 }}
          >
            Hello {user.FullName},
          </Typography>
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: 4 }}
          >
            We are excited to welcome you to our Gyansys family.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnboardingClick}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            Start Onboarding
          </Button>
        </Paper>
 
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              sx={{
                backgroundColor: "#f8f9f9",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 22px 8px, rgba(0, 0, 0, 0.05) 0px 32px 17px",
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Typography variant="h6">Introduction</Typography>
                <Typography color="textSecondary">
                  Welcome to Gyansys! We are thrilled to have you on board.
                  GyanSys is a leading global system integrator company
                  supporting enterprise customers. As a recognized innovator in
                  digital and process transformation, GyanSys is a global
                  systems integrator & professional services firm with leading
                  capabilities in SAP, Salesforce, Microsoft, ServiceNow,
                  DevOps, and Data & Analytics. Combining unmatched experience
                  and specialized skills across 15+ industries, we offer
                  advisory, implementation, and managed service solutions. Our
                  3000+ employees deliver on the promise of technology serving
                  more than 350 customers. We embrace the power of change to
                  create value and shared success for our clients, employees,
                  and communities. We are headquartered in Indianapolis,
                  Indiana, with delivery centers worldwide. 19+ Years of Growth
                  3,000+ Professionals 750+ Projects Delivered 350+ Customers
                  98%+ Customer Retention
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              sx={{
                backgroundColor: "#f8f9f9",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 22px 8px, rgba(0, 0, 0, 0.05) 0px 32px 17px",
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Typography variant="h6">What’s Next?</Typography>
                <Typography color="textSecondary">
                  After completing the onboarding process, you will receive an
                  email with further instructions. Please follow the guidelines
                  provided and feel free to reach out to the HR department if
                  you have any questions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
 
export default UserLanding;
