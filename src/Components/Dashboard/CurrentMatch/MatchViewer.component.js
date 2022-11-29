import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Fab, Grid, Snackbar, Stack, Tooltip } from "@mui/material";
import TeamSettings from "./TeamSettings.component";
import GeneralSettings from "./GeneralSettings.component";
import { Archive, DesktopMac, Save, Update } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../Helper/supabaseClient";
import ResponsiveDialog from "../Shared/ResponsiveDialog.component";
import * as React from "react";

const MatchViewer = ({matchId, projectId, handleUpdateTrigger, teams}) => {
  const generalSettingsRef = useRef();
  const blueSideRef = useRef();
  const orangeSideRef = useRef();

  const [open, setOpen] = useState(false);
  const [snackbarinfoopen, setsbiopen] = useState(false);
  const [snackbarsuccessopen, setsbsopen] = useState(false);

  useEffect(async () => {
    if (matchId === "new") {
      generalSettingsRef.current?.setSettings({
        name: "",
        format: "Bo3",
        date: new Date(),
        metadata: {}
      });

      blueSideRef.current?.setTeamData({
        id: "",
        wins: 0,
        metadata: {}
      });

      orangeSideRef.current?.setTeamData({
        id: "",
        wins: 0,
        metadata: {}
      });
      return 0;
    }

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
        id: data.blue_name ?? "",
        wins: data.blue_wins,
        metadata: data.blue_metadata
      });

      orangeSideRef.current?.setTeamData({
        id: data.orange_name ?? "",
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
          blue_name: blueSide.id,
          blue_wins: blueSide.wins,
          blue_metadata: blueSide.metadata,
          orange_name: orangeSide.id,
          orange_wins: orangeSide.wins,
          orange_metadata: orangeSide.metadata,
          lastUpdateBy: localStorage.getItem('username') || 'USR_ERROR'
        })
        .eq('id', matchId)
        .single();
      handleUpdateTrigger();
      setsbsopen(true);

      if (error) {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleInsert = async () => {
    const general = generalSettingsRef.current?.getSettings();
    const blueSide = blueSideRef.current?.getTeamData();
    const orangeSide = orangeSideRef.current?.getTeamData();

    try {
      const { error } = await supabase
        .from('match')
        .insert({
          name: general.name,
          gamedate: general.date,
          format: general.format,
          game_metadata: general.metadata,
          blue_name: blueSide.id,
          blue_wins: blueSide.wins,
          blue_metadata: blueSide.metadata,
          orange_name: orangeSide.id,
          orange_wins: orangeSide.wins,
          orange_metadata: orangeSide.metadata,
          project_id: projectId,
          lastUpdateBy: localStorage.getItem('username') || 'USR_ERROR'
        });
      handleUpdateTrigger();

      if (error) {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleOverlayUrl = async () => {
    if (!matchId) {
      return 0;
    }

    setsbiopen(true);
    await window.navigator.clipboard.writeText(`http://${window.location.host}/overlay/${projectId}/${matchId}`);
  }

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogConfirmation = async () => {
    try {
      await archiveMatch(matchId);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSBClose = () => {
    setsbsopen(false);
    setsbiopen(false);
  }

  const archiveMatch = async (id) => {
    try {
      const { error } = await supabase
        .from('match')
        .update({
          deleted: true,
          lastUpdateBy: localStorage.getItem('username') || 'USR_ERROR'
        })
        .eq('id', id)
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
      <Box sx={{ pl: 1, mr: 1, height: "calc(100vh - 60px)", overflow: "auto"}}>
        <Typography sx={{fontSize: "h6.fontsize", fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, mt: 1}}>Edit Match</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <GeneralSettings ref={generalSettingsRef}/>
            <Divider sx={{mt:3}}/>
            <Typography variant="overline" sx={{fontWeight: 900, mt: 1}}>Teams</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TeamSettings teams={teams} side="blue" ref={blueSideRef}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TeamSettings teams={teams} side="orange" ref={orangeSideRef}/>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{mt:3}}/>
            <Typography variant="overline" sx={{fontWeight: 900, mt: 1}}>Replays</Typography>
          </Grid>
        </Grid>
        {matchId === "new" ?
          <Fab
            sx={{position: 'fixed', bottom: 15, right: 15}}
            size="medium"
            variant="extended"
            color="primary"
            aria-label="save"
            onClick={handleInsert}
          >
            <Save sx={{mr: 1}} />
            Save
          </Fab> :
          <Box sx={{position: 'fixed', bottom: 15, right: 15}}>
            <Fab
              sx={{mr: 1}}
              size="medium"
              variant="extended"
              color="success"
              aria-label="overlay-url"
              onClick={handleOverlayUrl}
            >
              <DesktopMac sx={{mr: 1}} />
              Copy Overlay URL
            </Fab>
            <Fab
              sx={{mr: 1}}
              size="medium"
              variant="extended"
              color="primary"
              aria-label="update"
              onClick={handleUpdate}
            >
              <Update sx={{mr: 1}} />
              Update
            </Fab>
            <Tooltip title="Archive">
              <Fab
                size="medium"
                variant="circular"
                color="warning"
                aria-label="archive"
                onClick={handleDialogClickOpen}
              >
                <Archive />
              </Fab>
            </Tooltip>
            <ResponsiveDialog
              title={<>Archive <b>{generalSettingsRef.current?.getSettings().name}</b>?</>}
              content={<>Are you sure you want to archive this match?<br />Archived matches will not appear in this list!</>}
              open={open}
              actionName="Archive"
              action={handleDialogConfirmation}
              handleClose={handleDialogClose}
            />
            <Stack spacing={2} sx={{ width: '100%'}}>
              <Snackbar anchorOrigin={{vertical: "bottom",horizontal: "center"}} onClose={handleSBClose} open={snackbarinfoopen} autoHideDuration={6000}>
                <Alert onClose={handleSBClose} severity="info" sx={{ width: '100%' }}>
                  Copied Overlay URL!
                </Alert>
              </Snackbar>
              <Snackbar anchorOrigin={{vertical: "bottom",horizontal: "center"}} onClose={handleSBClose} open={snackbarsuccessopen} autoHideDuration={6000}>
                <Alert onClose={handleSBClose} severity="success" sx={{ width: '100%' }}>
                  Updated Match
                </Alert>
              </Snackbar>
            </Stack>
          </Box>
        }
      </Box> :
      <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
        Select a match...
      </Box>
  );
};

export default MatchViewer;