import Box from "@mui/material/Box";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { ToggleColorMode } from "../../../Features/Theme/Theme";
import { Switch } from "@mui/material";

export const ToggleColorModeSwitch = () => {
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <NightlightRoundedIcon
        fontSize="small"
        color={themeMode === "dark" ? "primary" : "disabled"}
      />
      <Switch
        size="small"
        color="primary"
        checked={themeMode === "light"}
        onClick={() => {
          dispatch(ToggleColorMode(themeMode === "dark" ? "light" : "dark"));
        }}
      />
      <WbSunnyRoundedIcon
        fontSize="small"
        color={themeMode === "light" ? "primary" : "disabled"}
      />
    </Box>
  );
};
