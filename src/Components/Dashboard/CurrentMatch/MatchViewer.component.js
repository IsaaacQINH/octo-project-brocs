import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fab, Grid, Paper } from "@mui/material";
import TeamSettings from "./TeamSettings.component";
import GeneralSettings from "./GeneralSettings.component";
import { Add, Save, Update } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { useEffect, useRef } from "react";
import { supabase } from "../../../Helper/supabaseClient";

const MatchViewer = ({matchId, handleUpdateTrigger}) => {
  const generalSettingsRef = useRef();
  const blueSideRef = useRef();
  const orangeSideRef = useRef();

  useEffect(async () => {
    const getMatchData = async (id) => {
      const {data} = await supabase
        .from('match')
        .select('*')
        .eq('id', id)
        .single();

      generalSettingsRef.current?.setSettings({
        name: data.name,
        format: data.format,
        date: data.gamedate,
        metadata: data.game_metadata
      });

      blueSideRef.current?.setTeamData({
        name: data.blue_name ?? "",
        wins: data.blue_wins,
        metadata: data.blue_metadata
      });

      orangeSideRef.current?.setTeamData({
        name: data.orange_name ?? "",
        wins: data.orange_wins,
        metadata: data.orange_metadata
      });
    };

    if (!matchId) {
      return;
    }

    getMatchData(matchId).then().catch();
  }, [matchId]);

  const handleUpdate = async () => {
    const general = generalSettingsRef.current?.getSettings();
    const blueSide = blueSideRef.current?.getTeamData();
    const orangeSide = orangeSideRef.current?.getTeamData();

    try {
      const { error } = await supabase
        .from('match')
        .update({
          name: general.name,
          gamedate: general.date,
          format: general.format,
          game_metadata: general.metadata,
          blue_name: blueSide.name,
          blue_wins: blueSide.wins,
          blue_metadata: blueSide.metadata,
          orange_name: orangeSide.name,
          orange_wins: orangeSide.wins,
          orange_metadata: orangeSide.metadata
        })
        .eq('id', matchId)
        .single();
      handleUpdateTrigger();

      if (error) {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    matchId ?
      <Box sx={{ pl: 1, mr: 1, height: 'calc(100vh - 60px)', borderLeft: '1px solid rgba(0,0,0,0.2)'}}>
        <Typography variant="h5">Edit Match</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <GeneralSettings ref={generalSettingsRef}/>
            <Divider sx={{mt:3}}/>
            <Typography sx={{mt:1}}>Teams</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TeamSettings side="blue" ref={blueSideRef}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TeamSettings side="orange" ref={orangeSideRef}/>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{mt:3}}/>
            <Typography sx={{mt:1}}>Replays</Typography>
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
      </Box> : <Box ><Paper></Paper></Box>
  );
};

export default MatchViewer;