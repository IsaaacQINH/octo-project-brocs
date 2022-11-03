import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TeamTable from "./DatabaseEditor/TeamTable.component";
import { useEffect, useState } from "react";
import PlayerTable from "./DatabaseEditor/PlayerTable.component";
import { FormControl, InputLabel, MenuItem, Select, Skeleton } from "@mui/material";
import { supabase } from "../../Helper/supabaseClient";
import { useOutletContext } from "react-router-dom";
import * as React from "react";
import FormDialog from "./DatabaseEditor/FormDialog.component";
import {Add} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const getPlayer = async (project) => {
  const { data } = await supabase
    .from('player')
    .select('name, steam_id, matches_played, matches_wins, team ( name )')
    .eq('project_id', project);

  return data;
}

const getTeams = async (project) => {
  const { data } = await supabase
    .from('team')
    .select('name, match_wins, match_losses')
    .eq('project_id', project);

  return data;
}

const DatabaseEditor = () => {
  const project = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState('team');
  const [player, setPlayer] = useState([]);
  const [teams, setTeam] = useState([]);

  const [openFormDialog, setOpenFD] = useState(false);

  useEffect(async () => {
    if (!project) {
      setTeam([]);
      setPlayer([]);
      return 0;
    }

    setLoading(true);
    if (table === 'team') {
      setTeam(await getTeams(project));
    } else {
      setPlayer(await getPlayer(project));
    }
    setLoading(false);
  }, [table, project]);

  const handleTableSelection = async (e) => {
    e.preventDefault();
    await setTable(e.target.value);
  };

  return (
    <Box>
      <Toolbar />
      {
        project ?
          <Box>
            <FormControl sx={{width: 250, ml: {xs: 1, sm: 3}, mr: {xs: 1, sm: 3}}}>
              <InputLabel sx={{mt: 2}} size="small" id="table-select-label">Table</InputLabel>
              <Select
                sx={{mt: 2}}
                size="small"
                labelId="table-select-label"
                id="table-select"
                label="Table"
                name="table"
                value={table}
                onChange={handleTableSelection}
              >
                <MenuItem value="team">Team</MenuItem>
                <MenuItem value="player">Player</MenuItem>
              </Select>
            </FormControl>
            <IconButton
                aria-label="new"
                sx={{mt: 2, background: '#4caf50', color: 'white', '&:hover': {background: '#6fbf72'}}}
                onClick={() => setOpenFD(true)}
            >
              <Add />
            </IconButton>
            {loading ? <Skeleton animation="pulse" sx={{m: 2, pb: 30}}/> :
                table === 'team' ? <TeamTable teams={teams} /> : <PlayerTable player={player} />
            }
            <FormDialog
                type="New"
                open={openFormDialog}
                handleClose={() => setOpenFD(false)}
                handleSubmit={() => setOpenFD(false)}
            />
          </Box> :
          <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
            Select a project...
          </Box>
      }
    </Box>
  );
};

export default DatabaseEditor;
