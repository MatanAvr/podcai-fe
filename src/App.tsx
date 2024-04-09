import "./App.scss";
import { Main } from "./Components/Main/Main";
import { useAppSelector } from "./Hooks/Hooks";
import { ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CustomAppBar from "./Pages/landing-page/components/CustomAppBar";
import { pwaInit } from "./Utils/pwaInstall";
pwaInit();

const UI: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
  typography: {
    fontFamily: ["Segoe UI", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
};
export const customDefaultTheme = createTheme({
  ...UI,
});

const darkTheme = createTheme({
  ...UI,
  palette: {
    mode: "dark",
  },
});
const App = () => {
  const themeColor = useAppSelector((state) => state.theme.themeColor);

  return (
    <ThemeProvider
      theme={themeColor === "dark" ? darkTheme : customDefaultTheme}
    >
      <div className="App">
        <CustomAppBar />
        <Main />
      </div>
    </ThemeProvider>
  );
};

export default App;
