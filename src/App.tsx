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
  const currentPage = useAppSelector((state) => state.navigation.currentPage);
  const themeMode = useAppSelector((state) => state.style.themeMode);

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : defaultTheme}>
      <div className="App">
        <Header />
        <Main currentPage={currentPage} />
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
