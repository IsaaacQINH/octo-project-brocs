import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import StandingsTable from "./Standings/Standings.component";

const Standings = () => {
  return (
    <Box>
      <Toolbar />
      <Typography variant="h5" sx={{ml: 2, mt: 2}}>Standings</Typography>
      <StandingsTable />
    </Box>
  );
};

export default Standings;
