import DialogContentText from "@mui/material/DialogContentText";
import {Grid, TextField} from "@mui/material";
import ResponsiveDialog from "../Shared/ResponsiveDialog.component";

const dialogTeamContent = <>
    <DialogContentText sx={{mb: 1}}>
        Add teams to project database.
    </DialogContentText>
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <TextField
                id="name"
                label="Name"
                type="name"
                size="small"
                fullWidth
                variant="outlined"
                placeholder="Team Name"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                id="match_wins"
                label="Match Wins"
                type="match_wins"
                size="small"
                fullWidth
                variant="outlined"
                value={0}
            />
            <TextField
                margin="dense"
                id="series_wins"
                label="Series Wins"
                type="serie_wins"
                size="small"
                fullWidth
                variant="outlined"
                value={0}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                id="match_losses"
                label="Match Losses"
                type="match_losses"
                size="small"
                fullWidth
                variant="outlined"
                value={0}
            />
            <TextField
                margin="dense"
                id="series_losses"
                label="Series Losses"
                type="series_losses"
                size="small"
                fullWidth
                variant="outlined"
                value={0}
            />
        </Grid>
    </Grid>
</>;

const FormDialog = ({open, content, type, actionName, handleSubmit, handleClose}) => {
    return (
        <ResponsiveDialog
            open={open}
            title={type}
            content={content}
            color="success"
            actionName={actionName}
            action={handleSubmit}
            handleClose={handleClose}
        />
    );
}

export {
    FormDialog,
    dialogTeamContent
};