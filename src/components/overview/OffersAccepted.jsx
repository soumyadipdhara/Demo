import {
  Avatar,
  CardContent,
  LinearProgress,
  Typography,
  Card,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Signature } from "@phosphor-icons/react";

import React from "react";

function OffersAccepted({ sx, value }) {
  return (
    <Card sx={{ ...sx, borderRadius: 4, boxShadow: 6 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                gutterBottom
                variant="overline"
              >
                Offers Accepted
              </Typography>
              <Typography variant="h4">{value}%</Typography>
            </Stack>
            <Avatar
              sx={{ height: "56px", width: "56px", backgroundColor: "orange" }}
            >
              <Signature />
            </Avatar>
          </Stack>
          <div>
            <LinearProgress value={value} variant="determinate" />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OffersAccepted;
