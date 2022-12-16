import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PlayerPortrait from "./PlayerPortrait.component";

const BLUE = "https://imgur.com/ZrE9yiw.png";
const ORANGE = "https://imgur.com/BfjSGRi.png";

const POVinfo = ({player, team}) => {
    return (
        <Box
            sx={{
                color: "white",
                position: 'absolute',
                width: 700,
                height: 140,
                left:0,
                bottom: 0,
                backgroundImage: `url(${team === 0 ? BLUE : ORANGE})`
            }}
        >
            <PlayerPortrait player={player} team={team} />
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 70, top: 0}}>NAME</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 80, bottom: -7.5, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 185, bottom: -7.5, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 290, bottom: -7.5, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 390, bottom: -7.5, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 490, bottom: -7.5, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h2" sx={{position: 'absolute', left: 590, bottom: -7.5, transform: 'translateX(-50%)'}}>{0}</Typography>
        </Box>
    );
}

export default POVinfo;