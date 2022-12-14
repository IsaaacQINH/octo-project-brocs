import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const PlayerCam = ({num, player, url}) => {
    return (
        <Box 
            sx={{
                position: 'absolute',
                width: 240,
                height: 135,
                top: 30 + (num * 142),
                left: -4,
                border: '5px white solid',
                borderRadius: 2,
                background: 'url("https://picsum.photos/240/135")'
            }}
        >
            <Typography color="white" fontFamily="LuckyLady" variant="h6" sx={{textAlign: 'center', position: 'absolute', width: '99%', left: '50%', bottom: 0, transform: 'translateX(-50%)', background: '#22222255'}}>{player.toUpperCase() || "NAME"}</Typography>
        </Box>
    );
}

export default PlayerCam;