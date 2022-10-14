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
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const getMatches = async () => {
      if (project === "") {
        return setMatches([]);
      }

      const {data} = await supabase
        .from('match')
        .select('id, name')
        .eq('project_id', project);

      if (!data) {
        return setMatches([]);
      }

      setMatches(data);
    };

    getMatches().then().catch();
  }, [project]);

  return (
    <Box>
      <Toolbar />
      <Grid container>
        <Grid item xs={4} md={3}>
          <MatchList matches={matches}/>
        </Grid>
        <Grid item xs={8} md={9}>
          <MatchViewer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentMatch;
