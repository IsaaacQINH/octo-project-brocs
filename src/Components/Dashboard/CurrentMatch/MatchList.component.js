import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const MatchList = () => {
  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="TRT vs. XD" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="TRT vs. LOL" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default MatchList;