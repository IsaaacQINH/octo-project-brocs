import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../Helper/supabaseClient";
import CamLinks from "./PlayerCams/CamLinks.component";
import GridHeadline from "./Shared/GridHeadline.component";

const BLUE = ["cam0", "cam1", "cam2"];
const ORANGE = ["cam3", "cam4", "cam5"];

const PlayerCams = () => {
    const project = useOutletContext();
    const [sid, setSid] = useState(null);

    useEffect(async () => {
      const controller = new AbortController();
      if (!project) {
        return;
      }

      try {
        const {data} = await supabase.from('project').select('storage_id').eq('id', project).single();

        if (!data.storage_id) {
          return;
        }
        
        setSid(data.storage_id);
      } catch (e) {
        console.error(e);
      }

      return () => controller.abort();
    }, [project]);

    return (
        <Box>
        {
          project ?
          <Box>
            <Grid container spacing={2} sx={{px: { xs: 2, lg: 15}, mt: 2}}>
              <GridHeadline main="Player" sub="_player_" />
              <Grid item xs={12}>
                  <Typography variant="body1">Team Blue</Typography>
                  {
                    BLUE.map((v, i) => (
                      <CamLinks key={i} sid={sid} name={v}/>
                    ))
                  }
                  <Divider sx={{mt: 2}}/>
                  <Typography variant="body1">Team Orange</Typography>
                  {
                    ORANGE.map((v, i) => (
                      <CamLinks key={i} sid={sid} name={v}/>
                    ))
                  }
                </Grid>
              <GridHeadline main="Caster" sub="_caster_" />
              <Grid item xs={12} sx={{textAlign: 'center'}}>
                --- WIP ---
              </Grid>
            </Grid>
          </Box> :
          <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
            Select a project...
          </Box>
        }
      </Box>
    );
}

export default PlayerCams;