import Typography from "@mui/material/Typography";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import Footer from "./landing-page/components/Footer";

interface Update {
  version: string;
  releaseDate: string;
  title: string;
  bullets: string[];
}

const updatesArr: Update[] = [
  {
    version: "1.0.1",
    releaseDate: "25.3.24",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi repellendus.",
    bullets: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Asperiores similique nulla totam voluptatem ab nesciunt.",
      "non qui. Libero est modi autem saepe numquam veniam tempore.",
      "repudiandae doloribus magnam sint nisi.",
    ],
  },
  {
    version: "1.0.0",
    releaseDate: "23.3.24",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi repellendus.",
    bullets: [
      "repudiandae doloribus magnam sint nisi.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "non qui. Libero est modi autem saepe numquam veniam tempore.",
      "Asperiores similique nulla totam voluptatem ab nesciunt.",
    ],
  },
];
export const Updates = () => {
  return (
    <Box
      id="updates-page-wrapper"
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      <Typography variant="h4" textAlign={"center"}>
        Updates
      </Typography>
      <Typography variant="h5" textAlign={"center"} color={"text.secondery"}>
        New updates, features, improvments and fixes.
      </Typography>
      {updatesArr.length > 0 &&
        updatesArr.map((update, index) => {
          return (
            <Box
              key={`update-${index}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 4,
                // width: "60%",
                gap: 1,
              }}
            >
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} px={2}>
                <Typography>Release date: {update.releaseDate}</Typography>
                <Typography variant="caption">
                  Version: {update.version}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  px: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {update.title}
                </Typography>
                <List dense>
                  {update.bullets.map((bullet, index) => {
                    return (
                      <ListItem key={`bullet-${index}`}>
                        <ListItemText
                          sx={{
                            display: "list-item",
                            listStyleType: "disc",
                            ml: 2,
                          }}
                          primary={bullet}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
          );
        })}

      <Footer />
    </Box>
  );
};
