import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";

const MatchList = (({ matches, handleUpdate }) => {
  const matchList = matches.map((value, index) =>
    (
      <ListItem key={index} disablePadding>
        <ListItemButton onClick={() => handleUpdate(value.id)}>
          <ListItemText
            sx={{color: value.id === "new" ? grey.A400 : "#000000"}}
            primary={value.name}
          />
        </ListItemButton>
      </ListItem>
    )
  );

  return (
    <Box sx={{height: "calc(100vh - 60px)", overflow: "auto", borderRight: '1px solid rgba(0,0,0,0.2)'}}>
      <List>
        {matchList}
      </List>
    </Box>
  );
});

MatchList.displayName = "MatchListComponent";

export default MatchList;