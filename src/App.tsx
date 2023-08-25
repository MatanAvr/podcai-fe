import "./App.scss";
import { Main } from "./Components/Main/Main";
import { Header } from "./Components/Header/Header";
import { useAppSelector } from "./Hooks/Hooks";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Hero", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },

  palette: {
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,255,255,0.87)",
    },
    background: {
      default: "linear-gradient(125deg, #8c52ff, #5ce1e6)",
      paper: "linear-gradient(125deg, #8c52ff, #5ce1e6)",
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
  const themeMode = useAppSelector((state) => state.style.themeMode);

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : defaultTheme}>
      <div className="App">
        <Header />
        <Main />
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
