import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowDown, ArrowUp, Person } from "@phosphor-icons/react";

function Budget({ diff, trend, sx, value }) {
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown;
  const trendColor = trend === "up" ? "#4caf50" : "#f44336";

  return (
    <Card sx={{ ...sx, borderRadius: 4, boxShadow: 6 }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Today's Joinee
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar
              sx={{ height: "56px", width: "56px", background: "lightblue" }}
            >
              <Person size={32} />
            </Avatar>
          </Stack>
          {diff ? (
            <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                spacing={0.5}
              >
                <TrendIcon color={trendColor} size={24} />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Budget;
