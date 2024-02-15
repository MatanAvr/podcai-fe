import "./App.scss";
import { Main } from "./Components/Main/Main";
import { useAppSelector } from "./Hooks/Hooks";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import CustomAppBar from "./Pages/landing-page/components/CustomAppBar";

export const customDefaultTheme = createTheme({
  typography: {
    fontFamily: ["Hero", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },

  palette: {
    text: {
      // primary: "rgba(255,255,255,0.87)",
      // secondary: "rgba(255,255,255,0.87)",
    },
    background: {
      // default: "linear-gradient(125deg, #8c52ff, #5ce1e6)",
      // paper: "linear-gradient(125deg, #8c52ff, #5ce1e6)",
    },
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: ["Hero", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  return (
    <ThemeProvider
      theme={themeMode === "dark" ? darkTheme : customDefaultTheme}
    >
      <div className="App">
        <CustomAppBar />
        <Main />
      </div>
    </ThemeProvider>
  );
};

export default App;
