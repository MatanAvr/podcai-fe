import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { LANDING_PAGE_PY } from "../../../ConstAndTypes/consts";

export default function BriefAndExample() {
  return (
    <Box id="bried-and-example" sx={{ py: LANDING_PAGE_PY }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Typography variant="h4">
            A convenient and enjoyable way <br />
            to stay informed about the topics that interest
          </Typography>
          <Typography
            variant="h3"
            color={"primary"}
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            you
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
