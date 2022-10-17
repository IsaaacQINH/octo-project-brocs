import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const MatchList = (({ matches, handleUpdate }) => {
  const matchList = matches.map((value, index) =>
    (
      <ListItem key={index} disablePadding>
        <ListItemButton onClick={() => handleUpdate(value.id)}>
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
});

MatchList.displayName = "MatchListComponent";

export default MatchList;