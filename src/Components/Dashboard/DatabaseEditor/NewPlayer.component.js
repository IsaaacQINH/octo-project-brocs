import { DialogContentText, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { countryList } from "../../../Helper/countryList";

const NewPlayer = forwardRef(({teams}, _ref) => {
    const [player, setPlayer] = useState({
        name: "",
        playerid: "",
        team: "",
        portrait: "",
        country: ""
    });

    useImperativeHandle(_ref, () => ({
        getPlayerData: () => {
          return player;
        },
        setPlayerData: (value) => {
          setPlayer(value);
        }
    }));

    const handleChange = (e) => {
        e.preventDefault();
        setPlayer({...player, [e.target.id]: e.target.value});
    }

    const handleSelect = (e, id) => {
        e.preventDefault();
        setPlayer({...player, [id]: e.target.value});
    }

    return (
        <>
            <DialogContentText sx={{mb: 1}}>
                Add teams to project database.
            </DialogContentText>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        id="name"
                        label="Name"
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Team Name"
                        value={player.name}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{mt: 1}}
                        id="playerid"
                        label="Primary ID"
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Epic ID / Steam ID"
                        value={player.playerid}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth sx={{mt:1}}>
                        <InputLabel size="small" id="team-label">Team</InputLabel>
                        <Select
                            size="small"
                            labelId="team-label"
                            id="team"
                            label="Team"
                            value={player.team}
                            onChange={(e) => handleSelect(e, 'team')}
                        >
                            {
                                teams ? teams.map((value, index) => (
                                    <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                )) : <MenuItem key="none" value={0}>No teams found</MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{mt: 1}}
                        id="portrait"
                        label="Portrait URL"
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Link to portrait"
                        value={player.portrait}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth sx={{mt:1}}>
                        <InputLabel size="small" id="country-label">Country</InputLabel>
                        <Select
                            size="small"
                            labelId="country-label"
                            id="country"
                            label="Country"
                            value={player.country}
                            onChange={(e) => handleSelect(e, 'country')}
                        >
                            {
                                countryList.map((value, index) => (
                                    <MenuItem key={index} value={value}>{value}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
});

export default memo(NewPlayer);