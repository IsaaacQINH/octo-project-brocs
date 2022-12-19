import Box from "@mui/material/Box";
import { useOutletContext } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../Helper/supabaseClient";
import { Button, Grid, Typography } from "@mui/material";
import GridHeadline from "./Shared/GridHeadline.component";

const SettingsManager = () => {
  const project = useOutletContext();
  const [config, setConfig] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(async () => {
    try {
      if (!project) {
        return setConfig(null);
      }

      const projectStorage = await supabase
        .from('project')
        .select(`
          storage_id, storage_global_id
        `)
        .eq('id', project).single();

      const { data } = await supabase
        .from('project_config_key')
        .select('key, value')
        .in('storage_id', [projectStorage.data.storage_id, projectStorage.data.storage_global_id]);

      setConfig(data);

    } catch (e) {
      console.error("Couldn't fetch project settings!");
    }
  }, [project]);

  useEffect(async () => {
    await userFromId();
  }, [config]);

  const userFromId = async () => {
    if (!config) {
      return;
    }

    try {
      const {data} = await supabase
        .from('user')
        .select('name, full_name')
        .in('id', JSON.parse(config.filter(c => c.key === "people")[0].value));

      setPeople(data);
    } catch (e) {
      console.error(e);
    }
  }

  const handleCopyInviteURL = async (e) => {
    if (!project) {
      return 0;
    }

    await window.navigator.clipboard.writeText(`http://${window.location.host}/join/${project}`);
    e.target.innerText = "Copied!";

    setTimeout(() => {
      e.target.innerText = "Copy to clipboard";
    }, 2500);
  }

  return (
    <Box>
      {
        project ?
        <Box>
          <Grid container spacing={2} sx={{px: { xs: 2, lg: 35}, mt: 2}}>
            <GridHeadline main="Settings" sub="_settings_" />
            <Grid item xs={12}>
              <Typography variant="body1" sx={{mt: 2, textAlign: 'center'}}>Coming soon: settings</Typography>
            </Grid>
            <GridHeadline main="Invite Link" sub="_invite_" />
            <Grid item xs={12}>
              <Typography variant="body1" sx={{textAlign: 'center'}}>Invite Link:
                <Button onClick={handleCopyInviteURL}>Copy to clipboard</Button>
              </Typography>
            </Grid>
            <GridHeadline main="People" sub="_people_" />
            <Grid item xs={12}>
              { people ?
                people.map((v, i) => (
                  <Typography variant="body1" key={i}>{v.name}</Typography>
                )) : "Error fetching people"
              }
            </Grid>
          </Grid>
        </Box> :
        <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
          Select a project...
        </Box>
      }
    </Box>
  );
};

export default SettingsManager;
