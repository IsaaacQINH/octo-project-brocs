import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Dashboard, ListAlt, Monitor, Storage, Workspaces } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Notice: Needs Cache clear apparently... whysoever

const drawerContent = [["Overview", "CurrentMatch", "Standings", "Database"], ["WIP"]];

const drawerIcons = [
  [
    <Dashboard key="overview" />,
    <Monitor key="current" />,
    <ListAlt key="standings" />,
    <Storage key="database" />
  ],
  [
    <Workspaces key="WIP" />,
  ],
];

const drawerRouter = [["", "current", "standings", "database"], [""]];

const drawer = (
  <div>
    <List>
      {drawerContent[0].map((text, index) => (
        <Link
          key={text}
          to={drawerRouter[0][index]}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{drawerIcons[0][index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
      {drawerContent[1].map((text, index) => (
        <Link
          key={text}
          to={drawerRouter[1][index]}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Workspaces />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
);

export default drawer;
