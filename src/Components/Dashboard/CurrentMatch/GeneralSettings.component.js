import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { forwardRef, memo, useImperativeHandle, useState } from "react";

const GeneralSettings = forwardRef((props, _ref) => {
  const [match, setMatch] = useState({
    name: "",
    format: "Bo3",
    date: new Date(),
    metadata: {}
  });

  const handleDateChange = (newDate) => {
    setMatch({...match, date: newDate._d});
  };

  const handleChange = (e) => {
    e.preventDefault();
    let newState = {...match, [e.target.name]: e.target.value};
    setMatch(newState);
  };

  useImperativeHandle(_ref, () => ({
    getSettings: () => {
      return match;
    },
    setSettings: (value) => {
      setMatch(value)
    }
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
        name="date"
        value={match.date}
        renderInput={(params) => <TextField fullWidth sx={{mt: 2}} size="small" {...params} />}
      />
      <FormControl fullWidth>
        <InputLabel sx={{mt: 2}} size="small" id="format-select-label">Format</InputLabel>
        <Select
          sx={{mt: 2}}
          size="small"
          labelId="format-select-label"
          id="format-select"
          label="Format"
          name="format"
          value={match.format}
          onChange={handleChange}
        >
          <MenuItem value="Bo1">Best of 1</MenuItem>
          <MenuItem value="Bo3">Best of 3</MenuItem>
          <MenuItem value="Bo5">Best of 5</MenuItem>
          <MenuItem value="Bo7">Best of 7</MenuItem>
          <MenuItem value="Bo9">Best of 9</MenuItem>
        </Select>
      </FormControl>
    </LocalizationProvider>
  )
});

GeneralSettings.displayName = "GeneralSettingsComponent";

export default memo(GeneralSettings);