const TeamSettings = ({side}) => {

  return (
    <>
      <TextField fullWidth size="small" variant="outlined" label={"Team " + side} />
      <FormControl fullWidth>
        <InputLabel sx={{mt: 2}} size="small" id={side + "-wins-select-label"}>Wins</InputLabel>
        <Select
          sx={{mt: 2}}
          size="small"
          labelId={side + "-wins-select-label"}
          id={side + "-wins-select"}
          label="Wins"
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
)
};

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default TeamSettings;