import Typography from "@mui/material/Typography";
import { Box, Card, Switch } from "@mui/material";
import { useAppSelector } from "../../Hooks/useStoreHooks";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import UsersTable from "./UsersTable";
import SupportTable from "./SupportTable";
import useGetSupportMessages from "../../Hooks/useGetSupportMessages";
import useGetAllUsers from "../../Hooks/useGetAllUsers";

const TITLE_SIZE = "h5";

export const AdminDashboard = () => {
  const features = useAppSelector((state) => state.featuresToggle);
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers();
  const { data: supportMessages } = useGetSupportMessages();

  const genericBox = (title: string, other: any) => {
    return (
      <Box display="flex" flexDirection={"column"} gap={1}>
        <Typography variant={TITLE_SIZE} color={"primary"}>
          {title}
        </Typography>
        <Card sx={{ display: "flex", flexDirection: "column", p: 2, gap: 0.5 }}>
          {other}
        </Card>
      </Box>
    );
  };

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

  const generalContainer = genericBox(
    "General",
    <>
      <Typography variant="caption" color="text.secondary" component="div">
        Users count
      </Typography>
      <Typography component="div">{users?.length || "?"}</Typography>
      <Typography variant="caption" color="text.secondary" component="div">
        Support messages
      </Typography>
      <Typography component="div">
        {supportMessages ? supportMessages.length : "?"}
      </Typography>
      <Typography variant="caption" color="text.secondary" component="div">
        Price calculator (last-month)
      </Typography>
      <Typography component="div">~2$ user/month</Typography>
    </>
  );

  const systemContainer = genericBox(
    "System",
    <>
      <Typography variant="caption" color="text.secondary" component="div">
        Engine
      </Typography>
      <Typography component="div">CLAUDE</Typography>

      <Typography variant="caption" color="text.secondary" component="div">
        Engine-model
      </Typography>
      <Typography component="div">claude-3-haiku-20240307</Typography>
    </>
  );

  const featureToggleContainer = genericBox(
    "Feature toggle",
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
            <Switch size="small" checked={feature.checked} disabled />
          </Box>
        );
      })}
    </Box>
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
        maxHeight: "90%",
      }}
    >
      {isLoadingUsers ? (
        <Box display="flex" width={"100%"} p={2}>
          <LoadingSpinner />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="space-between"
          width={"90%"}
          maxWidth="90%"
          gap={2}
          pb={2}
        >
          <Box
            display={"flex"}
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            {generalContainer}
            {systemContainer}
            {featureToggleContainer}
          </Box>
          {users && <UsersTable users={users} />}
          {supportMessages && (
            <SupportTable supportMessages={supportMessages} />
          )}
        </Box>
      )}
    </Box>
  );
};
