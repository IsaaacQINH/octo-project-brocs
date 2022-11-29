import { Box, Grid } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const PlayerCams = () => {
    const project = useOutletContext();
    return (
        <Box>
        {
          project ?
          <Box>
            Cams
          </Box> :
          <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
            Select a project...
          </Box>
        }
      </Box>
    );
}

export default PlayerCams;