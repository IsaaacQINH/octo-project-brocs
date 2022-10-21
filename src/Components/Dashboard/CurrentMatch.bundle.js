import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import Box from "@mui/material/Box";
import MatchList from "./CurrentMatch/MatchList.component";
import MatchViewer from "./CurrentMatch/MatchViewer.component";
import { Grid } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../Helper/supabaseClient";

const CurrentMatch = () => {
  const project = useOutletContext();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(async () => {
    const memSelected = selected;
    const getMatches = async (memS) => {
      if (project === "") {
        return [];
      }

      const {data} = await supabase
        .from('match')
        .select('id, name')
        .order('gamedate', {ascending: true})
        .eq('project_id', project)
        .eq('deleted', false);

      if (!data) {
        return [];
      }

      if (data.find(m => m.id === memS)) {
        setSelected(memS);
      } else {
        setSelected(null);
      }

      return data;
    };

    try {
      const fetchedMatches = await getMatches(memSelected);

      if (project) {
        fetchedMatches.push({id: "new", name: " + Add match"});
      }

      setMatches(fetchedMatches);
    } catch (e) {
      console.error(e);
    }
  }, [project, updateTrigger]);

  const handleUpdateSelectedMatch = (id) => {
    setSelected(id);
  }

  const handleUpdateTrigger = () => {
    setUpdateTrigger(!updateTrigger);
  }

  return (
    <Box>
      <Toolbar />
      <Grid container>
        <Grid item xs={4} md={3}>
          <MatchList matches={matches} handleUpdate={handleUpdateSelectedMatch}/>
        </Grid>
        <Grid item xs={8} md={9}>
          <MatchViewer matchId={selected} projectId={project} handleUpdateTrigger={handleUpdateTrigger} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentMatch;
