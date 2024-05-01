import "./App.scss";
import { Main } from "./Components/Main/Main";
import { useAppSelector } from "./Hooks/useStoreHooks";
import { ThemeProvider } from "@mui/material/styles";
import CustomAppBar from "./Pages/landing-page/components/CustomAppBar";
import { pwaInit } from "./Utils/pwaInstall";
import { darkTheme, customDefaultTheme } from "./Theme";
pwaInit();

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
