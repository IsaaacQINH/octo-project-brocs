import { Box } from "@mui/system";

const BLUE = "https://imgur.com/x8fMSdy.png";
const ORANGE = "https://imgur.com/i5e4a3s.png";

const POVinfo = ({team}) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                width: 704,
                height: 126,
                left:0,
                bottom: 0,
                backgroundImage: `url(${team === 0 ? BLUE : ORANGE})`
            }}
        >

        </Box>
    );
}

export default POVinfo;