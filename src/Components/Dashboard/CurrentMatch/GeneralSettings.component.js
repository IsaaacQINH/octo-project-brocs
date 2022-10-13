import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { forwardRef, memo, useImperativeHandle, useState } from "react";

const GeneralSettings = forwardRef((props, _ref) => {
  const [match, setMatch] = useState({
    name: "",
    format: "",
    date: new Date()
  });

  const handleDateChange = (newDate) => {
    setMatch({...match, date: newDate._d});
  }

  const handleChange = (e) => {
    e.preventDefault();
    let newState = {...match, [e.target.name]: e.target.value}
    setMatch(newState);
  }

  useImperativeHandle(_ref, () => ({
    getSettings: () => {
      return match;
    },
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
      <Typography>General</Typography>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        label="Name"
        name="name"
        value={match.name}
        onChange={handleChange} />
      <DateTimePicker
        inputFormat="DD/MM/YYYY HH:mm"
        ampm={false}
        disablePast={true}
        onChange={handleDateChange}
        label="Date"
        value={match.date}
        renderInput={(params) => <TextField fullWidth sx={{mt: 1}} size="small" {...params} />}
      />
      <TextField
        sx={{mt: 1}}
        fullWidth
        size="small"
        variant="outlined"
        label="Format"
        name="format"
        value={match.format}
        onChange={handleChange}/>
    </LocalizationProvider>
  )
});

GeneralSettings.displayName = "GeneralSettingsComponent";

export default memo(GeneralSettings);