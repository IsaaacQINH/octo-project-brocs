import { Box, Typography } from "@mui/material";
import { width } from "@mui/system";

const Scoreboard = ({blue, orange, match, isReplay}) => {
    const blueMatchPoints = new Array(match?.blue_wins);
    const orangeMatchPoints = new Array(match?.orange_wins);
    const topbar = !isReplay ? (match?.format.toUpperCase() || "") : "REPLAY";
    const [scoreWidth, scoreHeight] = match?.format === "Bo3" ? [9, 38] : [9, 28];


    for (let i = 0; i < match?.blue_wins; i++) {
        blueMatchPoints.push(
            <Box sx={{
                position: 'absolute',
                width: scoreWidth,
                height: scoreHeight,
                bottom: 53.5 + (i * (scoreHeight + 2)),
                left: 7,
                background: 'yellow',
            }}
        />);
        
    }

    for (let i = 0; i < match?.orange_wins; i++) {
        blueMatchPoints.push(
            <Box sx={{
                position: 'absolute',
                width: scoreWidth,
                height: scoreHeight,
                bottom: 53.5 + (i * (scoreHeight + 2)),
                right: 4,
                background: 'yellow'
            }}
        />);
        
    }

    return (
        <Box sx={{
                position: 'absolute',
                width: 222, 
                height: 202,
                top: 50, 
                right: 200,
                color: 'white',
                backgroundImage: 'url("https://imgur.com/IG7gWpa.png")'
            }}
        >
            <Typography fontFamily="LuckyLady" variant="body1" sx={{position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', fontSize: 25}}>{topbar}</Typography>
            <Typography fontFamily="LuckyLady" variant="body1" sx={{position: 'absolute', left: '27.5%', top: 30, transform: 'translateX(-50%)', fontSize: 25}}>{blue?.metadata.prefix || ""}</Typography>
            <Typography fontFamily="LuckyLady" variant="body1" sx={{position: 'absolute', left: '72.5%', top: 30, transform: 'translateX(-50%)', fontSize: 25}}>{orange?.metadata.prefix || ""}</Typography>
            <Typography fontFamily="LuckyLady" variant="h1" sx={{position: 'absolute', left: '27.5%', top: 45, transform: 'translateX(-50%)'}}>{0}</Typography>
            <Typography fontFamily="LuckyLady" variant="h1" sx={{position: 'absolute', left: '72.5%', top: 45, transform: 'translateX(-50%)'}}>{3}</Typography>
            <Typography fontFamily="LuckyLady" variant="h3" sx={{position: 'absolute', left: '50%', top: 145, transform: 'translateX(-50%)'}}>{"5:00"}</Typography>
            { blueMatchPoints }
            { orangeMatchPoints }
        </Box>
    );
}

export default Scoreboard;