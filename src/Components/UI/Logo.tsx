import Typography from "@mui/material/Typography/Typography";
import podcaiLogoImg from "../../Assets/Images/podcaiLogo.png";
import { Avatar, Box } from "@mui/material";

const logoSize = {
  width: "2.6vw",
  height: "2.6vw",
};
const PodcaiLogo = () => {
  return (
    <Box
      id="podcai-logo-wrapper"
      sx={{
        display: { xs: "none", md: "flex", gap: 8, alignItems: "center" },
      }}
    >
      <Avatar src={podcaiLogoImg} sx={{ ...logoSize }} alt="Podcai-logo" />
      <Typography color="text.primary" variant="h6">
        Podcai
      </Typography>
    </Box>
  );
};

export default PodcaiLogo;
