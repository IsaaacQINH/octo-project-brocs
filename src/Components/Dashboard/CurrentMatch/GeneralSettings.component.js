import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

const GeneralSettings = () => {

  return (
    <>
      <Typography>General</Typography>
      <TextField fullWidth size="small" variant="outlined" label="Name" />
      <TextField sx={{mt: 1}} fullWidth size="small" variant="outlined" label="Date" />
      <TextField sx={{mt: 1}} fullWidth size="small" variant="outlined" label="Format" />
    </>
  )
};

export default GeneralSettings;