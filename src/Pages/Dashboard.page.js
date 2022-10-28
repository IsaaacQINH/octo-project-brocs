import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer/";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Account from "../Components/Dashboard/Sidebar/Account.component";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { supabase } from "../Helper/supabaseClient";
import { Avatar } from "@mui/material";
import { Dashboard, ListAlt, Monitor, Settings, Storage, Workspaces } from "@mui/icons-material";
import DrawerComponent from "../Components/Dashboard/Sidebar/Drawer.component";
import * as React from "react";
import SearchButton from "../Components/Dashboard/Appbar/SearchButton.component";

const drawerWidth = 225;

const links = [
  {route: '', name: 'Overview', icon: <Dashboard />},
  {name: 'divider'},
  {route: 'current', name: 'Current Match', icon: <Monitor />},
  {route: 'standings', name: 'Standings', icon: <ListAlt />},
  {route: 'database', name: 'Database', icon: <Storage />},
  {name: 'divider'},
  {route: 'layout', name: 'Layout', icon: <Workspaces />},
  {route: 'settings', name: 'Settings', icon: <Settings />}
];

const ResponsiveDrawer = ({ wdw }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState("");

  const user = supabase.auth.user();

  useEffect(async () => {
    const getProjects = async () => {

      if (!user) {
        setProject("");
        return -2;
      }

      const fetch = await supabase
        .from('user')
        .select('projects')
        .eq('id', user.id).single();

      if (!fetch.data) {
        return setProjects([]);
      }

      const {data} = await supabase
        .from('project')
        .select('id, name')
        .in('id', fetch.data.projects);

      if (!data) {
        setProjects([]);
        return -2;
      }

      setProjects(data);
    }

    try {
      const code = await getProjects();
      if (code === -2) {
        console.error("Couldn't load projects!");
      }
    }
    catch (e) {
      console.error(e);
    }

  }, [user]);

  const projectList = projects ? projects.map((values, index) =>
    <MenuItem key={index} value={values.id}>{values.name}</MenuItem>
  ) : [];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProjectSelect = (e) => {
    e.preventDefault();
    setProject(e.target.value);
  }

  const container =
    wdw !== undefined ? () => wdw().document.body : undefined;

  return (user ?
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="transparent"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <FormControl sx={{m: 1, width: {xs: 225, sm: 300 }}}>
            <InputLabel id="project-select-label" size="small">Project</InputLabel>
            <Select
              size="small"
              variant="outlined"
              labelId="project-select-label"
              label="project"
              value={project}
              onChange={handleProjectSelect}
            >
              <MenuItem value="">Choose a project</MenuItem>
              <Divider />
              {projectList}
            </Select>
          </FormControl>
          <Box sx={{width: { xs: 250, sm: `calc(100% - 125px)` }}}>
            <Avatar sx={{ float: "right", display: {sm: "none"}}} alt={user ? user.user_metadata.full_name : "name"} src={user ? user.user_metadata.avatar_url : "null"} />
            <SearchButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="whatever"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerComponent links={links}/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Account user={user}/>
          <Divider />
          <DrawerComponent links={links} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet context={project} />
      </Box>
    </Box> : <Navigate to="/login" />
  );
};

export default ResponsiveDrawer;
