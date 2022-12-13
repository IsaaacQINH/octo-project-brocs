import { Box } from "@mui/system";

const Boostmeter = () => {
    return (
        <Box 
            sx={{
                position: 'absolute',
                width: 145,
                height: 454,
                right: 30,
                bottom: 30,
                backgroundImage: 'url("https://imgur.com/fL1BwfQ.png")'
            }}
        >
            <Box 
                sx={{
                    position: 'absolute',
                    width: 80,
                    height: '100%',
                    bottom: 0,
                    right: 40,
                    transform: 'skew(-4deg)',
                    background: 'rgb(200, 0, 50)'
                }}
            />
        </Box>
    )
}

export default Boostmeter;