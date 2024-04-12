import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard.page";
import CurrentMatch from "./Components/Dashboard/CurrentMatch.bundle";
import DatabaseEditor from "./Components/Dashboard/DatabaseEditor.bundle";
import WebsitePage from "./Pages/Website.page";
import Home from "./Components/Website/Home.bundle";
import About from "./Components/Website/About.bundle";
import Standings from "./Components/Dashboard/Standings.bundle";
import OverlayPage from "./Pages/Overlay.page";
import Overview from "./Components/Dashboard/Overview.bundle";
import Login from "./Components/Website/Login.bundle";
import CssBaseline from "@mui/material/CssBaseline";
import { supabase } from "./Helper/supabaseClient";
import LayoutEditor from "./Components/Dashboard/Layout.bundle";
import SettingsManager from "./Components/Dashboard/Settings.bundle";
import StringHelper from "./Helper/String";
import Requirements from "./Components/Dashboard/Requirements.bundle";
import JoinProject from "./Components/Website/JoinProject.bundle";
import Tutorial from "./Components/Dashboard/Tutorial.bundle";
import PlayerCams from "./Components/Dashboard/PlayerCam.bundle";

const App = () => {
  // const session = supabase.auth.session();
  const user = supabase.auth.user();

  if (!user) {
    localStorage.removeItem("username");
  }

  if (
    user &&
    localStorage.getItem("username") !== user.user_metadata.full_name
  ) {
    localStorage.setItem("username", user.user_metadata.full_name);
  }

  //Load Helper once
  StringHelper();

  return (
    <StrictMode>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<DashboardPage />}>
            <Route path="" element={<Overview />} />
            <Route path="current" element={<CurrentMatch />} />
            <Route path="playercams" element={<PlayerCams />} />
            <Route path="standings" element={<Standings />} />
            <Route path="database" element={<DatabaseEditor />} />
            <Route path="layout" element={<LayoutEditor />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="requirements" element={<Requirements />} />
            <Route path="tutorial" element={<Tutorial />} />
          </Route>
          <Route path="" element={<WebsitePage />}>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route
            path="overlay"
            element={<Navigate to="/dashboard/current" />}
          />
          <Route path="overlay/:project" element={<OverlayPage />} />
          <Route path="overlay/:project/:match" element={<OverlayPage />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<About />} />
          <Route path="join" element={<Navigate to="/" />} />
          <Route path="join/:project" element={<JoinProject />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
