import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import StandingsTable from "./Standings/Standings.component";
import {useOutletContext} from "react-router-dom";
import * as React from "react";

const Standings = () => {
    const project = useOutletContext();

      return (
        <Box>
            {
                project ?
                <>
                    <Typography variant="h5" sx={{ml: 2, mt: 2}}>Standings</Typography>
                    <StandingsTable project={project}/>
                </> :
                <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
                    Select a project...
                </Box>
            }
        </Box>
      );
};

export default Standings;
