import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const PlayerCam = ({num, player, url}) => {

    return (
        <Box 
            sx={{
                zIndex: 200,
                position: 'absolute',
                width: 240,
                height: 135,
                top: 30 + (num * 142),
                left: -4,
                border: '5px white solid',
                borderRadius: 2
            }}
        >
            <iframe 
                src={url + "&cleanoutput&transparent"}
                allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;" 
                width={237}
                height={130} 
                style={{zIndex: 100, position: 'absolute', top: -2, left: -3, border: 'none'}}/>
            <Typography color="white" fontFamily="LuckyLady" variant="h6" sx={{zIndex: 101, textAlign: 'center', position: 'absolute', width: '99%', left: '50%', bottom: 0, transform: 'translateX(-50%)', background: '#22222255'}}>{player.toUpperCase() || "NAME"}</Typography>
        </Box>
    );
}

export default PlayerCam;