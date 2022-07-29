import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard.page";
import CurrentMatch from "./Components/Dashboard/CurrentMatch.bundle";
import DatabaseEditor from "./Components/Dashboard/DatabaseEditor.bundle";
import WebsitePage from "./Pages/Website.page";
import Home from "./Components/Website/Home.bundle";
import About from "./Components/Website/About.bundle";
import Standings from "./Components/Dashboard/Standings.bundle";
import OverlayPage from "./Pages/Overlay.page";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<DashboardPage />}>
            <Route path="current" element={<CurrentMatch />} />
            <Route path="standings" element={<Standings />} />
            <Route path="database" element={<DatabaseEditor />} />
          </Route>
          <Route path="/" element={<WebsitePage />}>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="overlay" element={<OverlayPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
