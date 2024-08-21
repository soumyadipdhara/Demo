
import React from 'react';
import { Card, Stack, Typography, CardContent, CardHeader } from '@mui/material';
import Chart from 'react-apexcharts';
import { styled } from '@mui/material/styles';

const StyledChart = styled(Chart)``;

function SkillsChart({ chartSeries, labels, sx }) {

  const chartOptions = useChartOptions(labels);


  return (
    <Card sx={{ ...sx, borderRadius: 4, boxShadow: 6 }}>
      <CardHeader title='Skills'/>
      <CardContent  >
     
        <Stack spacing={3}>
         
          <StyledChart height={300} options={chartOptions} series={chartSeries} type='donut' width='100%' />
          <Stack direction='row' sx={{ alignItems: 'center' , justifyContent :'center' }} spacing={2} >
            {chartSeries.map((item, index) => {
              const label = labels[index];
           

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                 
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels) {
  return {
    chart: { background: 'transparent' },
    colors: ['#D7BDE2', '#8E44AD', '#5B2C6F'],
    dataLabels: { enabled: false },
    labels: labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: {
      active: { filter: { type: 'none' } },
      hover: { filter: { type: 'none' } },
    },
    stroke: { width: 0 },
    tooltip: { fillSeriesColor: false },
  };
}

export default SkillsChart;


