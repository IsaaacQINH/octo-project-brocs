import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

// Notice: Needs Cache clear apparently... whysoever
const DIVIDERNAME = 'divider'

const DrawerComponent = ({links}) => {
  const linkList = links.map((value, index) =>
    (
      value.name !== DIVIDERNAME ?
        <NavLink to={value.route} key={index} style={({ isActive }) => isActive ? { background: '#EEEEFF' } : undefined}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText primary={value.name} />
            </ListItemButton>
          </ListItem>
        </NavLink> : <Divider key={index} />
    )
  );

  return (
    <List>
      {linkList}
      <Divider />
    </List>
  );
}

export default DrawerComponent;
