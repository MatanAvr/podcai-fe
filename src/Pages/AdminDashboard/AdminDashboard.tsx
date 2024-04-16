import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { ApiClient } from "../../Services/axios";

const apiClientInstance = ApiClient.getInstance();

export const AdminDashboard = () => {
  return (
    <Box
      id="admin-dashboard-wrapper"
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1.5,
      }}
    >
      <Typography variant="h4" component="div" textAlign={"center"}>
        Admin dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          maxWidth: "90%",
          gap: 1,
        }}
      >
        <Typography>Users count: 41</Typography>
        <Typography>Users list</Typography>
        <Typography>Can see user episodes</Typography>
        <Typography>Can change episode text and regenerate it</Typography>
        <Typography>Can delete user</Typography>
        <Typography>Can change feature flags</Typography>
        <Typography>
          Can change global variables like engine and model (?)
        </Typography>
        <Typography>
          See and edit/delete messages from 'support' table
        </Typography>
      </Box>
    </Box>
  );
};
