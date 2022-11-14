import { forwardRef, memo, useImperativeHandle, useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TeamSettings = forwardRef(({teams, side}, _ref) => {
  const [team, setTeam] = useState({
    id: "",
    wins: 0,
    metadata: {}
  });

  const handleNameChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setTeam({ ...team, id: e.target.value });
  }

  const handleWinsChange = (e) => {
    e.preventDefault();
    setTeam({...team, wins: e.target.value});
  };

  useImperativeHandle(_ref, () => ({
    getTeamData: () => {
      return team;
    },
    setTeamData: (value) => {
      setTeam(value);
    }
  }));

  return (
    <>
      <FormControl fullWidth>
        <InputLabel size="small" id={side + "-team-select-label"}>Team</InputLabel>
        <Select
          size="small"
          labelId={side + "-team-select-label"}
          id={side + "-team-select"}
          label="Team"
          value={team.id}
          onChange={handleNameChange}
        >
          {
            teams ? teams.map((value, index) => (
              <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
            )) : <MenuItem value={team.id}>Failed to fetch</MenuItem>
          }
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel sx={{mt: 2}} size="small" id={side + "-wins-select-label"}>Wins</InputLabel>
        <Select
          sx={{mt: 2}}
          size="small"
          labelId={side + "-wins-select-label"}
          id={side + "-wins-select"}
          label="Wins"
          value={team.wins}
          onChange={handleWinsChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl>
    </>
  );
});

TeamSettings.displayName = `TeamSettingsComponent`;

export default memo(TeamSettings);