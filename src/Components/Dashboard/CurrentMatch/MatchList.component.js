import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { ListItem, Skeleton } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import moment from "moment/moment";

const MatchList = (({ loading, matches, selected, handleUpdate }) => {
  const matchList = matches.map((value, index) =>
    (
      <ListItem key={index} disablePadding sx={{background: value.id === selected ? "#EEEEFF" : "none"}}>
        <ListItemButton onClick={() => handleUpdate(value.id)}>
          <ListItemText
            sx={{color: value.id === "new" ? grey.A400 : "#000000"}}
            primary={loading ? <Skeleton variant="text" width="50%" /> : value.name}
            secondary={loading ? <Skeleton variant="text" width="45%" /> : (value.gamedate ? moment(value.gamedate).format("DD/MM/YYYY HH:mm"): "") }
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