import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { ToggleColorMode } from "../../../Features/Theme/Theme";

const ToggleColorModeButton = () => {
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ maxWidth: "32px" }}>
      <Button
        variant="text"
        onClick={() =>
          dispatch(ToggleColorMode(themeMode === "dark" ? "light" : "dark"))
        }
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: "32px", height: "32px", p: "4px" }}
      >
        {themeMode === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
};

export default ToggleColorModeButton;
