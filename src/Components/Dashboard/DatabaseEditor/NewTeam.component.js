import { DialogContentText, Grid, TextField } from "@mui/material";
import { forwardRef, memo, useImperativeHandle, useState } from "react";

const NewTeam = forwardRef((props, _ref) => {
    const [team, setTeam] = useState({
        name: "",
        prefix: "",
        logo: ""
    });

    useImperativeHandle(_ref, () => ({
        getTeamData: () => {
          return team;
        },
        setTeamData: (value) => {
          setTeam(value);
        }
    }));

    const handleChange = (e) => {
        e.preventDefault();
        setTeam({...team, [e.target.id]: e.target.value});
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
                        onChange={handleChange}
                        value={team.name}
                    />
                    <TextField
                        sx={{mt: 1}}
                        id="prefix"
                        label="Prefix"
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="ex. TRT"
                        onChange={handleChange}
                        value={team.prefix}
                    />
                    <TextField
                        sx={{mt: 1}}
                        id="logo"
                        label="Logo URL"
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Link to team logo"
                        onChange={handleChange}
                        value={team.logo}
                    />
                </Grid>
            </Grid>
        </>
    )
});

export default memo(NewTeam);