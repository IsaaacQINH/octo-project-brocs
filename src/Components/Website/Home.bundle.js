import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Box width="100%" sx={{textAlign: "center"}}>
                <Typography variant="h2" mt={2}>A <b>B</b>etter <b>R</b>ocket <b>L</b>eague <b>O</b>verlay <b>C</b>ontrol <b>S</b>ystem</Typography>
            </Box>
        </Grid>
    </Grid>
  );
};

export default Home;
