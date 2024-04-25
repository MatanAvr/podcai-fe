import Typography from "@mui/material/Typography";
import { Box, Card, Switch } from "@mui/material";
import { ApiClient } from "../../Services/axios";
import { useAppSelector } from "../../Hooks/Hooks";

const apiClientInstance = ApiClient.getInstance();

export const AdminDashboard = () => {
  const features = useAppSelector((state) => state.featuresToggle);
  const featuresObjArr = [
    {
      name: "Add To Home Screen Enabled",
      checked: features.addToHomeScreenEnabled,
    },
    { name: "Google Login Enabled", checked: features.googleLoginEnabled },
    { name: "Google Sign Up Enabled", checked: features.googleSignUpEnabled },
    {
      name: "Upload Profile Pic Enabled",
      checked: features.uploadProfilePicEnabled,
    },
    {
      name: "Admin Dashboard enabled",
      checked: features.adminDashboardEnabled,
    },
  ];
  const usersContainer = (
    <>
      <Typography variant="h5" component="div">
        Users
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Count
        </Typography>
        <Typography component="div">41</Typography>
      </Card>
    </>
  );

  const systemContainer = (
    <>
      <Typography variant="h5" component="div">
        System
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Engine
        </Typography>
        <Typography component="div">CLAUDE</Typography>

        <Typography variant="caption" color="text.secondary" component="div">
          Engine-model
        </Typography>
        <Typography component="div">claude-3-haiku-20240307</Typography>
      </Card>
    </>
  );

  const featureToggleContainer = (
    <>
      <Typography variant="h5" component="div">
        Feature toggle
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
        >
          {featuresObjArr.map((feature, index) => {
            return (
              <Box
                key={`feature-toggle-${index}`}
                display={"flex"}
                alignItems="center"
                gap={1}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Typography component="div">{feature.name}</Typography>
                <Switch size="small" checked={feature.checked} />
              </Box>
            );
          })}
        </Box>
      </Card>
    </>
  );

  const supportContainer = (
    <>
      <Typography variant="h5" component="div">
        Support
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Messages
        </Typography>
        <Typography component="div">0</Typography>
      </Card>
    </>
  );

  const priceCalcContainer = (
    <>
      <Typography variant="h5" component="div">
        Price calculator
      </Typography>
      <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary" component="div">
          Last month
        </Typography>
        <Typography component="div">2$ user/month</Typography>
      </Card>
    </>
  );

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
          justifyContent: "space-between",
          maxWidth: "90%",
          gap: 2,
        }}
      >
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          {usersContainer}
          {systemContainer}
          {featureToggleContainer}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          {supportContainer}
          {priceCalcContainer}
          {/* {featureToggleContainer} */}
        </Box>
        {/* <Typography>Users count and list</Typography>
        <Typography>Can see user episodes</Typography>
        <Typography>Can change episode text and regenerate it</Typography>
        <Typography>Can delete/archive user</Typography>
        <Typography>Can change feature flags</Typography>
        <Typography>
          Can change global variables like engine and model (?)
        </Typography>
        <Typography>
          See and edit/delete messages from 'support' table
        </Typography>
        <Typography>Price calculator</Typography> */}
      </Box>
    </Box>
  );
};
