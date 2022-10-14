import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const MatchList = ({ matches }) => {
  const matchList = matches.map((value, index) =>
    (
      <ListItem key={index} disablePadding>
        <ListItemButton>
          <ListItemText primary={value.name} />
        </ListItemButton>
      </ListItem>
    )
  );

  return (
    <Box>
      <List>
        {matchList}
      </List>
    </Box>
  );
};

export default MatchList;