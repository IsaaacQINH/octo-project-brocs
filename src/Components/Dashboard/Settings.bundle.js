import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useOutletContext } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../Helper/supabaseClient";

const SettingsManager = () => {
  const project = useOutletContext();
  const [config, setConfig] = useState(null);

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

  return (
    <Box>
      {
        project ?
        <Box>
          <code>{config}</code>
        </Box> :
        <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
          Select a project...
        </Box>
      }
    </Box>
  );
};

export default SettingsManager;
