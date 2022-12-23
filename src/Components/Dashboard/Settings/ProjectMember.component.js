import { Chair, DoorBack } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

const ProjectMember = ({name}) => {
    const handleKick = async () => {
        console.log("kick " + name);
    }

    return (
        <Grid container sx={{my: 1}} spacing={1}>
            <Grid item xs={12} lg={7}>{name}</Grid>
            <Grid item xs={6} lg={2}>
                <Button fullWidth variant="outlined" color="error" startIcon={<DoorBack />} onClick={handleKick} disabled>Kick</Button>
            </Grid>
            <Grid item xs={6} lg={3}>
                <Button fullWidth variant="outlined" color="error" startIcon={<Chair />} onClick={handleKick} disabled>Transfer Ownership</Button>
            </Grid>
        </Grid>
    );
}

export default ProjectMember;