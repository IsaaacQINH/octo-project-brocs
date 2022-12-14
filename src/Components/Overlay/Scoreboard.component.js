import { Box, Typography } from "@mui/material";
import { width } from "@mui/system";

const Scoreboard = ({blue, orange, match, isReplay}) => {
    const blueMatchPoints = new Array(match?.blue_wins);
    const orangeMatchPoints = new Array(match?.orange_wins);
    const topbar = !isReplay ? (match?.format.toUpperCase() || "") : "REPLAY";

    for (let i = 0; i < match?.blue_wins; i++) {
        blueMatchPoints.push(
            <Box sx={{
                position: 'absolute',
                width: 14,
                height: 30,
                bottom: 52.5 + (i * 30),
                left: 3.5,
                backgroundImage: 'url("https://imgur.com/aelFdhK.png")'
            }}
        />);
        
    }

    for (let i = 0; i < match?.orange_wins; i++) {
        blueMatchPoints.push(
            <Box sx={{
                position: 'absolute',
                width: 14,
                height: 30,
                bottom: 52.5 + (i * 30),
                right: 2.5,
                backgroundImage: 'url("https://imgur.com/aelFdhK.png")'
            }}
        />);
        
    }

    return (
        <Box sx={{
                position: 'absolute',
                width: 222, 
                height: 202,
                top: 50, 
                right: 50,
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