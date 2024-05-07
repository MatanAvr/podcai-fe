import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      display={{ xs: "block", md: "none" }}
      width={"100%"}
      border={"1px solid rgba(255,255,255,0.25)"}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsRoundedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
