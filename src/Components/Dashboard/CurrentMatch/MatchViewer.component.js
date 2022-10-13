import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fab, Grid } from "@mui/material";
import TeamSettings from "./TeamSettings.component";
import GeneralSettings from "./GeneralSettings.component";
import { Add, Save, Update } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { useRef } from "react";

const MatchViewer = () => {
  const generalSettingsRef = useRef();

  const handleUpdate = () => {
    const general = generalSettingsRef.current?.getSettings();
    console.log(general);
  }

  return (
    <Box sx={{ pl: 1, mr: 1, height: 'calc(100vh - 60px)', borderLeft: '1px solid rgba(0,0,0,0.2)'}}>
      <Typography variant="h5">Edit Match</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GeneralSettings ref={generalSettingsRef}/>
          <Divider sx={{mt:1}}/>
          <Typography sx={{mt:1}}>Teams</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TeamSettings side="blue" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TeamSettings side="orange" />
        </Grid>
      </Grid>
      <Fab sx={{position: 'fixed', bottom: 15, right: 250}} size="small" variant="circular" color="success" aria-label="new">
        <Add />
      </Fab>
      <Fab sx={{position: 'fixed', bottom: 15, right: 140}} size="medium" variant="extended" color="primary" aria-label="save">
        <Save sx={{mr: 1}} />
        Save
      </Fab>
      <Fab
        sx={{position: 'fixed', bottom: 15, right: 15}}
        size="medium"
        variant="extended"
        color="primary"
        aria-label="update"
        onClick={handleUpdate}>
        <Update sx={{mr: 1}} />
        Update
      </Fab>
    </Box>
  );
};

export default MatchViewer;