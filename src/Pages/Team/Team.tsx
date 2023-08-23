import { Typography } from "@mui/material";
import "./Team.scss";

type member = { name: string; role: string; img: string; links: [] };
const teamMembers: member[] = [
  { name: "Matan Avraham", role: "Front-end", img: "", links: [] },
  { name: "Ron Avraham", role: "Back-end", img: "", links: [] },
  {
    name: "Adar Matzuba-Ehrlich",
    role: "Business Development and Marketing",
    img: "",
    links: [],
  },
  {
    name: "Tirosh M-E. Avraham",
    role: "UI/UX Design and Branding",
    img: "",
    links: [],
  },
];
export const Team = () => {
  return (
    <div>
      <Typography variant="h4" component="div">
        Team
      </Typography>

      {/* <Box sx={{ display: "flex" }}>
        {teamMembers.map((member, index) => (
          <Card
            key={"MEMBER-" + index}
            variant="elevation"
            elevation={1}
            sx={{
              p: 1,
              m: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              flex: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" component="div">
              {member.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {member.role}
            </Typography>
          </Card>
        ))}
      </Box> */}
    </div>
  );
};
