import "./App.scss";
import { Main } from "./Components/Main/Main";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { useState } from "react";
import { Pages } from "./ConstAndTypes/consts";

const App = () => {
  const [currentPage, setCurrentPage] = useState<Pages>("Login");

  const changePageHandler = (newPage: Pages) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} changePageHandler={changePageHandler} />
      <Main currentPage={currentPage} />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
