import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { supabase } from "./Helper/supabaseClient";
import CssBaseline from "@mui/material/CssBaseline";

import DashboardPage from "./Pages/Dashboard.page";
import WebsitePage from "./Pages/Website.page";
import OverlayPage from "./Pages/Overlay.page";
import CurrentMatch from "./Components/Dashboard/CurrentMatch.bundle";
import DatabaseEditor from "./Components/Dashboard/DatabaseEditor.bundle";
import Home from "./Components/Website/Home.bundle";
import About from "./Components/Website/About.bundle";
import Standings from "./Components/Dashboard/Standings.bundle";
import Overview from "./Components/Dashboard/Overview.bundle";
import Login from "./Components/Website/Login.bundle";
import OverlayComponent from "./Components/Overlay/Overlay.component";
import LayoutEditor from "./Components/Dashboard/Layout.bundle";
import SettingsManager from "./Components/Dashboard/Settings.bundle";

const darkMode = createTheme({
  palette: {
    mode: "light",
  }
});

const App = () => {
  const user = supabase.auth.user();

  if (!user) {
    localStorage.removeItem('username');
  }

  if (user && localStorage.getItem('username') !== user.user_metadata.full_name) {
    localStorage.setItem('username', user.user_metadata.full_name);
  }

  return (
    <StrictMode>
      <ThemeProvider theme={darkMode}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="dashboard" element={<DashboardPage />}>
              <Route path="" element={<Overview />} />
              <Route path="current" element={<CurrentMatch />} />
              <Route path="standings" element={<Standings />} />
              <Route path="database" element={<DatabaseEditor />} />
              <Route path="layout" element={<LayoutEditor />} />
              <Route path="settings" element={<SettingsManager />} />
            </Route>
            <Route path="" element={<WebsitePage />}>
              <Route path="" element={<Home />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="overlay" element={<OverlayPage />}>
              <Route path=":project" element={<OverlayComponent />} />
              <Route path=":project/:match" element={<OverlayComponent />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
