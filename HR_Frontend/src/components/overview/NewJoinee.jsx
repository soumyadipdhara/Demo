import { Avatar, CardContent, Stack, Typography } from "@mui/material";
import { ArrowDown, ArrowUp, Users } from "@phosphor-icons/react";
import Card from "@mui/material/Card";

function NewJoinee({ diff, sx, count, trend }) {
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
                New Joinees
              </Typography>
              <Typography variant="h4">{count}</Typography>
            </Stack>
            <Avatar
              sx={{
                height: "56px",
                width: "56px",
                backgroundColor: "lightgreen",
              }}
            >
              <Users size={32} />
            </Avatar>
          </Stack>
          {diff !== undefined && (
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
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NewJoinee;
