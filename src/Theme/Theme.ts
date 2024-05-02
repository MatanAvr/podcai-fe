import { ThemeOptions, createTheme, responsiveFontSizes } from "@mui/material";

// const PRIMARY_COLOR_RGBA = "rgba(0,119,237,255)";
const PRIMARY_COLOR_HEX = "#0077ED";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ["Segoe UI", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: { main: PRIMARY_COLOR_HEX },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
};

let customDefaultTheme = createTheme(themeOptions);
customDefaultTheme = responsiveFontSizes(customDefaultTheme);

const darkTheme = createTheme({
  ...customDefaultTheme,
  palette: {
    mode: "dark",
  },
});

export { darkTheme, customDefaultTheme };
