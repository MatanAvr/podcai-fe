import Typography from "@mui/material/Typography/Typography";
import podcaiLogoImg from "../../Assets/Images/podcaiLogo.webp";
import { Avatar, Box } from "@mui/material";
import { useScrollToSection } from "../../Hooks/useScrollToSection";
import { TPages } from "../../Types/Types";
import { useMyNavigation } from "../../Hooks/useMyNavigation";
import { useAppSelector } from "../../Hooks/useStoreHooks";

const logoSize = {
  width: 35,
  height: 35,
};

type PodcaiLogoProps = { clickToHomePage?: boolean };
const PodcaiLogo = ({ clickToHomePage }: PodcaiLogoProps) => {
  const scrollToSection = useScrollToSection();
  const nav = useMyNavigation();
  const isAuth = useAppSelector((state) => state.user.auth);

  const changePageHandler = (newPage: TPages) => {
    nav.push(newPage);
  };

  return (
    <Box
      id="podcai-logo-wrapper"
      display="flex"
      alignItems={"center"}
      justifyContent="center"
      gap={1}
      marginInlineStart={2}
      sx={{
        cursor: "pointer",
      }}
      onClick={() => {
        if (isAuth) {
          changePageHandler("Home");
        } else {
          scrollToSection("Hero");
        }
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
