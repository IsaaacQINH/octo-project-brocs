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
import {Avatar, Menu, TextField, Typography} from "@mui/material";
import { Dashboard, Inventory, ListAlt, Monitor, Settings, Storage, Workspaces } from "@mui/icons-material";
import DrawerComponent from "../Components/Dashboard/Sidebar/Drawer.component";
import * as React from "react";
import SearchButton from "../Components/Dashboard/Appbar/SearchButton.component";
import ResponsiveDialog from "../Components/Dashboard/Shared/ResponsiveDialog.component";
import DialogContentText from "@mui/material/DialogContentText";
import {grey} from "@mui/material/colors";

const drawerWidth = 225;

const links = [
  {route: '', name: 'Overview', icon: <Dashboard />},
  {name: 'divider'},
  {route: 'current', name: 'Current Match', icon: <Monitor />},
  {route: 'standings', name: 'Standings', icon: <ListAlt />},
  {route: 'database', name: 'Database', icon: <Storage />},
  {name: 'divider'},
  {route: 'layout', name: 'Layout', icon: <Workspaces />},
  {route: 'settings', name: 'Settings', icon: <Settings />},
  {name: 'divider'},
  {route: 'requirements', name: 'Requirements', icon: <Inventory />}
];

const addField = {id: "new", name: "+ Add project"};
const settings = ["Return to Homepage", "Profile"];

const DashboardPage = ({ wdw }) => {
  const [openNewProject, setOpenNP] = useState(false);
  const [loadingNewProject, setLoadingNP] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [newProject, setNewProject] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = supabase.auth.user();

  useEffect(async () => {
    const getProjects = async () => {

      if (!user) {
        setProject("");
        return -2;
      }

      const fetch = await supabase
        .from('user')
        .select('full_name, projects, roles')
        .eq('id', user.id).single();

      if (!fetch.data) {
        //new user
        return setProjects([]);
      }

      if (fetch.data.projects === null) {
        return setProjects([addField]);
      }

      const {data} = await supabase
        .from('project')
        .select('id, name')
        .in('id', fetch.data.projects);

      if (!data) {
        setProjects([addField]);
        return -2;
      }

      data.push(addField);
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (e) => {
    switch (e.target.id) {
        case 'logout':
          await supabase.auth.signOut();
          break;
        case 'return to homepage':
          return window.location.href = "/";
          break;
        default:
          break;
    }

    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProjectSelect = (e) => {
    e.preventDefault();

    if (e.target.value === "new") {
      setOpenNP(true);
      return setProject(prevState => prevState);
    }

    setProject(e.target.value);
  }

  const handleProjectCreation = async () => {
    if (newProject === "") {
      return setOpenNP(false);
    }

    setLoadingNP(true);
    try {
      const existing = projects.map(p => p.id);
      existing.pop();

      const projectStorage = await supabase
          .from('project_storage')
          .insert({
            name: newProject.toLowerCase().replaceAll(' ', '-'),
            global: false,
            visible: true,
            type: 'team'
          }).single();

      const {data} = await supabase
          .from('project')
          .insert({
            name: newProject,
            storage_id: projectStorage.data.id,
            storage_global_id: '83ae7887-f6ea-4bce-bf04-b8169ce9022a'
          }).single();

      existing.push(data.id);

      const {error} = await supabase
          .from('user')
          .update({projects: existing})
          .eq('id', user.id).single();

      if (error) {
        console.error(error);
      }

      setNewProject("");
      setProjects(prevState => {
        const pop = prevState.pop();
        prevState.push(data);
        prevState.push(pop);
        return prevState;
      });
    } catch (e) {
      console.error(e);
    }

    setOpenNP(false);
    setLoadingNP(false);
  }

  const handleProjectCancel = () => {
    setOpenNP(false);
  }

  const projectList = projects ? projects.map((values, index) =>
      <MenuItem key={index} value={values.id} sx={values.id === "new" ? {color: grey.A400}:{}}>{values.name}</MenuItem>
  ) : [];

  const dialogContent = <>
    <DialogContentText sx={{mb: 1}}>
      Add teams to project database.
    </DialogContentText>
    <TextField
        id="name"
        label="Name"
        type="name"
        size="small"
        fullWidth
        variant="outlined"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
    />
  </>;

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
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(5px)'
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
              <Avatar 
                sx={{ float: "right", display: {sm: "none"}}} 
                alt={user ? user.user_metadata.full_name : "name"} 
                src={user ? user.user_metadata.avatar_url : "null"} 
                onClick={handleOpenUserMenu}
              />
            <SearchButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="whatever"
      >
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
          <Account user={user} handleOpenUserMenu={handleOpenUserMenu} handleCloseUserMenu={handleCloseUserMenu}/>
          <Divider />
          <DrawerComponent links={links} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Outlet context={project} />
      </Box>
      <ResponsiveDialog
          loading={loadingNewProject}
          open={openNewProject}
          title="Create new Project"
          content={dialogContent}
          color="success"
          actionName="Create"
          action={handleProjectCreation}
          handleClose={handleProjectCancel}
      />
       <Menu
          sx={{ mt: 1 }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" id={setting.toLowerCase()}>{setting}</Typography>
              </MenuItem>
          ))}
        </Menu>
    </Box> : <Navigate to="/login" />
  );
};

export default DashboardPage;
