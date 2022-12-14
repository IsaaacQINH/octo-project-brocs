import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { Chip } from "@mui/material";

// Notice: Needs Cache clear apparently... whysoever
const DIVIDERNAME = 'divider'

const DrawerComponent = ({links}) => {
  const linkList = links.map((value, index) => {
    if (value.name !== DIVIDERNAME && !value.meta) {
      return (
        <NavLink to={value.route} key={index} style={({ isActive }) => isActive ? { background: '#EEEEFF' } : undefined}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText primary={value.name} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      );
    } else if (value.meta) {
      return (
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemIcon>{value.icon}</ListItemIcon>
            <ListItemText primary={value.name} />
            <Chip variant="outlined" color="success" size="small" label={value.meta}/>
          </ListItemButton>
        </ListItem>
      );
    } else {
      return <Divider key={index} />;
    }
  });

  return (
    <List>
      {linkList}
    </List>
  );
}

export default DrawerComponent;
