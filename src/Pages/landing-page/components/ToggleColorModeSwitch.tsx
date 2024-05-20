import Box from "@mui/material/Box";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useStoreHooks";
import { ToggleColorMode } from "../../../Features/Theme";
import { Switch } from "@mui/material";

export const ToggleColorModeSwitch = () => {
  const themeColor = useAppSelector((state) => state.theme.themeColor);
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
        color={themeColor === "dark" ? "primary" : "disabled"}
      />
      <Switch
        size="small"
        checked={themeColor === "light"}
        onClick={() => {
          dispatch(ToggleColorMode(themeColor === "dark" ? "light" : "dark"));
        }}
      />
      <WbSunnyRoundedIcon
        fontSize="small"
        color={themeColor === "light" ? "primary" : "disabled"}
      />
    </Box>
  );
};
