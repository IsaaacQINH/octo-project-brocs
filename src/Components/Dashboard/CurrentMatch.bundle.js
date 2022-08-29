import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import Box from "@mui/material/Box";
import MatchList from "./CurrentMatch/MatchList.component";
import MatchViewer from "./CurrentMatch/MatchViewer.component";
import { Grid } from "@mui/material";

const CurrentMatch = () => {
  return (
    <Box>
      <Toolbar />
      <Grid container>
        <Grid item xs={4}>
          <MatchList />
        </Grid>
        <Grid item xs={8}>
          <MatchViewer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentMatch;
