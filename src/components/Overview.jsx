
import React from "react";
import SideNavBar from "./SideNavBar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import Budget from "../components/overview/Budget";
import NewJoinee from "../components/overview/NewJoinee";
import OffersAccepted from "../components/overview/OffersAccepted";
import Graph from "../components/overview/Graph";
import SkillsChart from "./overview/SkillsChart";
import MianNav from "./MianNav";


function Overview() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



// function Overview({}) {
//   //const [bgColor, setBgColor] = useState('linear-gradient(268deg, rgb(25, 49, 108) 2.8%, rgb(1, 179, 201) 97.8%)');


  //const [bgColor, setBgColor] = useState('linear-gradient(268deg, rgb(25, 49, 108) 2.8%, rgb(1, 179, 201) 97.8%)');




  const chartSeries = [
    { name: "Graph", data: [10, 20, 30, 40, 10, 60, 50, 70, 20, 30, 80, 30] },
  ];
  const skillsChartSeries = [50, 30, 20];
  const labels = ["HTML", "ANGULAR", "SQL"];

  // const toggleBackground = () => {
  //   if (bgColor === 'white') {
  //     setBgColor('linear-gradient(268deg, rgb(25, 49, 108) 2.8%, rgb(1, 179, 201) 97.8%)');
  //   } else {
  //     setBgColor('white');
  //   }
  // };

  // useEffect(() => {
  //   document.body.style.background = bgColor;
  // }, [bgColor]);

  return (
    <>
    
      <div className="overview">
        
        <div className="sidebar col-2">
          <SideNavBar />
          
          
        </div>

        <div className="main-content col-10">
          <MianNav/>
          <Grid
          sx={{marginTop:"10px"}}
            container
            spacing={3}
            alignItems="start"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Budget
                value="10"
                trend="up"
                diff={12}
                sx={{ height: isSmallScreen ? "150px" : "180px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <NewJoinee
                count={50}
                diff={5}
                trend="up"
                sx={{ height: isSmallScreen ? "150px" : "180px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <OffersAccepted value={60} sx={{ height: isSmallScreen ? "150px" : "180px" }} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Graph chartSeries={chartSeries} sx={{ height: "500px" }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <SkillsChart
                chartSeries={skillsChartSeries}
                labels={labels}
                sx={{ height: "500px" }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Overview;
