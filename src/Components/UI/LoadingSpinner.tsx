import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
