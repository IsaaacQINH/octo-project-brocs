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
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selected, setSelected] = useState(null);

  useEffect(async () => {
    const memSelected = selected;
    const getMatches = async (memS) => {
      if (project === "") {
        return [];
      }

      const { count } = await supabase
        .from('match')
        .select('id', {count: 'exact'})
        .eq('project_id', project)
        .eq('deleted', false);

      if (count) {
        setSkeleton(new Array(count).fill(1));
        setLoading(true);
      }

      const {data} = await supabase
        .from('match')
        .select('id, name, gamedate')
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

    const getTeams = async () => {
      if (!project) {
        return [];
      }
      
      const {data} = await supabase
        .from('team')
        .select('id, name')
        .eq('project_id', project)
        .eq('deleted', false);

      return data;
    }

    try {
      const fetchedMatches = await getMatches(memSelected);
      const fetchedTeams = await getTeams();

      if (project) {
        fetchedMatches.push({id: "new", name: " + Add match"});
      }

      setMatches(fetchedMatches);
      setTeams(fetchedTeams);
      setLoading(false);
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
    project ?
    <Box>
      <Toolbar />
      <Grid container>
        <Grid item xs={5} md={4}>
          <MatchList loading={loading} matches={loading ? skeleton : matches} selected={selected} handleUpdate={handleUpdateSelectedMatch}/>
        </Grid>
        <Grid item xs={7} md={8}>
          <MatchViewer matchId={selected} projectId={project} handleUpdateTrigger={handleUpdateTrigger} teams={teams} />
        </Grid>
      </Grid>
    </Box> :
    <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
      <Toolbar />
      Select a project...
    </Box>
  );
};

export default CurrentMatch;
