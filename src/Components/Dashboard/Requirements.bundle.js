import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Toolbar from "@mui/material/Toolbar";
import { supabase } from "../../Helper/supabaseClient";

const GridHeadline = ({main, sub}) => {
    return (
        <>
            <Grid item xs={6} sx={{pr: 2}}>
                <Typography variant="h4" align="right">{main}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography sx={{mt: 1}} variant="h5" align="left" color={grey.A400}>{sub}</Typography>
            </Grid>
        </>
    )
}

const Requirements = () => {
  return (
    <Box>
      <Grid container spacing={2} sx={{px: { xs: 2, md: 35}, mt: 2}}>
        <GridHeadline main="Requirements" sub="_req_" />
        <Grid item xs={12}>
            <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit bibendum sollicitudin. Nunc dapibus quam sed mauris volutpat semper. Proin convallis finibus ipsum vel pulvinar. Integer maximus purus vitae sem vestibulum sodales. Duis accumsan suscipit nunc, ac scelerisque nulla dignissim non. Donec vel suscipit nisl. Mauris est lacus, convallis id consequat ultrices, viverra eu purus. Praesent ultricies, quam ac aliquet pulvinar, odio elit luctus quam, ut scelerisque odio sem elementum leo. Curabitur faucibus urna a sapien elementum bibendum. Donec sit amet metus mollis arcu porta dignissim et a quam. Pellentesque sollicitudin sed dui eget molestie. Nam in molestie lectus.
            </Typography>
        </Grid>
        <GridHeadline main="BakkesMod Plugins" sub="_plugins_" />
        <GridHeadline main="OBS Studio" sub="_obs_" />
        <GridHeadline main="Browser" sub="_browser_" />
        <GridHeadline main="Discord" sub="_discord_" />
      </Grid>
    </Box>
  );
};

export default Requirements;
