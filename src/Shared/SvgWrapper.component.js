import Box from "@mui/material/Box";

const SvgWrapperComponent = ({svg, sx}) => {
    return (
        <Box sx={sx}>
            {svg}
        </Box>
    )
}

export default SvgWrapperComponent;