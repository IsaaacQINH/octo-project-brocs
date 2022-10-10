import { TextField } from "@mui/material";

const TeamSettings = ({side}) => {

  return (
    <TextField fullWidth size="small" variant="outlined" label={"Team " + side} />
  )
};

export default TeamSettings;