import * as React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../Helper/supabaseClient";
import { useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import PlayerTable from "./DatabaseEditor/PlayerTable.component";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {Add, Update} from "@mui/icons-material";
import { FormDialog, dialogTeamContent, dialogPlayerContent } from "./DatabaseEditor/FormDialog.component";
import TeamTable from "./DatabaseEditor/TeamTable.component";

const getPlayer = async (project) => {
  const { data } = await supabase
    .from('player')
    .select('name, player_id, matches_played, matches_wins, team ( name )')
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

  const [openUpdateDialog, setOpenUD] = useState(false);
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
    setTable(e.target.value);
  };

  const handleTeamInsert = async () => {
    try {
      const {data} = await supabase
        .from('team')
        .insert({
          
        })
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box>
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
            <Tooltip title="Update table">
              <IconButton
                  aria-label="new"
                  sx={{ml: 1, mt: 2, background: '#14c9de', color: 'white', '&:hover': {background: '#63e8f7'}}}
                  onClick={() => setOpenUD(true)}
              >
                <Update />
              </IconButton>
            </Tooltip>
            {loading ? <Skeleton animation="pulse" sx={{m: 2, pb: 30}}/> :
                table === 'team' ? <TeamTable teams={teams} /> : <PlayerTable player={player} />
            }
            {
              table === 'team' ?
                <FormDialog
                  type={"New " + table.capitalize()}
                  open={openFormDialog}
                  content={dialogTeamContent}
                  actionName="Save"
                  handleClose={() => setOpenFD(false)}
                  handleSubmit={() => handleTeamInsert()}
                /> :
                <FormDialog
                  type={"New " + table.capitalize()}
                  open={openFormDialog}
                  content={dialogPlayerContent}
                  actionName="Save"
                  handleClose={() => setOpenFD(false)}
                  handleSubmit={() => handleTeamInsert()}
                />
            }
            <FormDialog
                type={"Update " + table.capitalize()}
                content={<>Are you sure you want to update the <b>{table.capitalize()}</b> table?</>}
                open={openUpdateDialog}
                actionName="Confirm"
                handleClose={() => setOpenUD(false)}
                handleSubmit={() => setOpenUD(false)}
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
