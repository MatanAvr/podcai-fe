import Typography from "@mui/material/Typography";
import { Box, Card, Switch } from "@mui/material";
import { ApiClient } from "../../Services/axios";
import { useAppSelector } from "../../Hooks/Hooks";
import { useQuery } from "@tanstack/react-query";
import {
  ALL_USERS_QUERY_KEY,
  DEFAULT_QUERY_DATA_STALE_TIME_MINUTES,
} from "../../ConstAndTypes/consts";
import { minutesInMilliseconds } from "../../Utils/Utils";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import UsersTable from "./UsersTable";

const apiClientInstance = ApiClient.getInstance();
const TITLE_SIZE = "h6";
export const AdminDashboard = () => {
  const features = useAppSelector((state) => state.featuresToggle);

  const getAllUsers = async () => {
    const res = await apiClientInstance.getAllUsers();
    return res.users;
  };

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: [ALL_USERS_QUERY_KEY],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    staleTime: minutesInMilliseconds(DEFAULT_QUERY_DATA_STALE_TIME_MINUTES),
  });

  const genericBox = (title: string, other: any) => {
    return (
      <>
        <Typography variant={TITLE_SIZE} color={"primary"}>
          {title}
        </Typography>
        <Card sx={{ display: "flex", flexDirection: "column", p: 1, gap: 0.5 }}>
          {other}
        </Card>
      </>
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
      <Typography component="div">?</Typography>
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
        <LoadingSpinner />
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            width={"90%"}
            maxWidth="90%"
            gap={2}
          >
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              {generalContainer}
              {systemContainer}
              {featureToggleContainer}
            </Box>
            <UsersTable users={users!} />
          </Box>
        </>
      )}
    </Box>
  );
};
