import { Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";

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

export default GridHeadline;