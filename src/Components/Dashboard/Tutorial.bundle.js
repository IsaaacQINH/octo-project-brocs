import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { color } from "@mui/system";
import { Link } from "react-router-dom";
import GridHeadline from "./Shared/GridHeadline.component";

const Tutorial = () => {

  return (
    <Box>
      <Grid container spacing={2} sx={{px: { xs: 2, lg: 35}, mt: 2}}>
        <GridHeadline main="Getting started" sub="_start_" />
        <Grid item xs={12}>
            <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit bibendum sollicitudin. Nunc dapibus quam sed mauris volutpat semper. Proin convallis finibus ipsum vel pulvinar. Integer maximus purus vitae sem vestibulum sodales. Duis accumsan suscipit nunc, ac scelerisque nulla dignissim non. Donec vel suscipit nisl. Mauris est lacus, convallis id consequat ultrices, viverra eu purus. Praesent ultricies, quam ac aliquet pulvinar, odio elit luctus quam, ut scelerisque odio sem elementum leo. Curabitur faucibus urna a sapien elementum bibendum. Donec sit amet metus mollis arcu porta dignissim et a quam. Pellentesque sollicitudin sed dui eget molestie. Nam in molestie lectus.
            </Typography>
        </Grid>
        <GridHeadline main="Current Match" sub="_matches_" />
        <Grid item xs={12}>
        </Grid>
        <GridHeadline main="Standings" sub="_standings_" />
        <GridHeadline main="Database" sub="_data_" />
        <GridHeadline main="Layout" sub="_overlay_" />
        <GridHeadline main="Settings" sub="_settings_" />
        <GridHeadline main="Invite others" sub="_collab_" />
        <Grid item xs={12}>
          <Typography variant="body1">
            To invite others go to <Link to="/dashboard/settings" style={{color: blue.A400}} className="hover-underline">Settings</Link> and copy the Invite link. Everyone with this link can now join your project and work with it. <b>Reminder:</b> Keep this link as secret as possible.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tutorial;
