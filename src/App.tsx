import "./App.scss";
// import { useState } from "react";
import { Main } from "./Components/Main/Main";
import { Header } from "./Components/Header/Header";
// import { Footer } from "./Components/Footer/Footer";
// import { Pages } from "./ConstAndTypes/consts";
import { useAppSelector } from "./Hooks/Hooks";

const App = () => {
  const currentPage = useAppSelector((state) => state.navigation.currentPage);

  return (
    <div className="App">
      <Header />
      <Main currentPage={currentPage} />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
