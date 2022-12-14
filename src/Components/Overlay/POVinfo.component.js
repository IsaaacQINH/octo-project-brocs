import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PlayerPortrait from "./PlayerPortrait.component";

const BLUE = "https://imgur.com/x8fMSdy.png";
const ORANGE = "https://imgur.com/i5e4a3s.png";

const POVinfo = ({player, team}) => {
    return (
        <Box
            sx={{
                color: "white",
                position: 'absolute',
                width: 704,
                height: 126,
                left:0,
                bottom: 0,
                backgroundImage: `url(${team === 0 ? BLUE : ORANGE})`
            }}
        >
            <PlayerPortrait player={player} team={team} />
            <Typography fontFamily="LuckyLady" variant="h3" sx={{position: 'absolute', left: 70, top: 0}}>NAME</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 95, bottom: -6, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 200, bottom: -6, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 285, bottom: -6, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 385, bottom: -6, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 480, bottom: -6, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 580, bottom: -6, transform: 'translateX(-50%)'}}>{0}</Typography>
        </Box>
    );
}

export default POVinfo;