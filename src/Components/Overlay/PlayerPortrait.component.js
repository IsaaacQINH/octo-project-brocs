import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const BLUE = "https://imgur.com/FOZwDjE.png";
const ORANGE = "https://imgur.com/2dUk1l5.png";

const PlayerPortrait = ({player, team}) => {
    return (
        <Box
            sx={{
                color: "white",
                position: 'absolute',
                width: 257,
                height: 399,
                left:15,
                bottom: 135,
                backgroundImage: `url(${player || (team === 0 ? BLUE : ORANGE)})`
            }}
        />
    );
}

export default PlayerPortrait;