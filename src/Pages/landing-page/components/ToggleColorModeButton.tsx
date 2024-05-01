import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useStoreHooks";
import { ToggleColorMode } from "../../../Features/Theme";

export const ToggleColorModeButton = () => {
  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ maxWidth: "32px" }}>
      <Button
        variant="text"
        onClick={() =>
          dispatch(ToggleColorMode(themeColor === "dark" ? "light" : "dark"))
        }
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: "32px", height: "32px", p: "4px" }}
      >
        {themeColor === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <NightlightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
};
