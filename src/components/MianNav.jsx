import React, { useContext, useState } from "react";
import { Avatar, Badge, Box, IconButton, Stack, Tooltip } from "@mui/material";
import avatar from "../assets/avatar.png";
import { UserContext } from "../components/context/UserContext";
import UserPopover from "./UserPopover";
import { Bell } from "@phosphor-icons/react";
import logo from "../assets/gyansys-logo-black.png";

function MianNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        component="header"
        sx={{
          //   borderBottom: "1px solid var(--mui-palette-divider)",
          backgroundColor: "white",

          position: "sticky",
          top: 0,
          zIndex: "20",
        }}
      >
          {/* <Box>
          <img src={logo} alt="Gyansys Logo"  />
        </Box> */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
            minHeight: "64px",
            px: 2,
          }}
        >
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <Bell />
                </IconButton>
              </Badge>
            </Tooltip>
            <Avatar
              src={avatar}
              sx={{ cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
          </Stack>
        </Stack>
        <UserPopover
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          open={open}
        />
      </Box>
    </>
  );
}

export default MianNav;
