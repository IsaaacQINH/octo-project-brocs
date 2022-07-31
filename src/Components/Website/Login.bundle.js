import Box from "@mui/material/Box";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Lock } from "@mui/icons-material";

const Login = () => {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Paper elevation={5} sx={{p: 4, borderRadius: 10}}>
        <Typography variant="h4">Login</Typography>
        <Typography variant="body1">Create or login to your account with Discord</Typography>
        <Divider sx={{p: 2}} />
        <Button variant="contained" size="large" sx={{width: "100%", mt: 2}}>
          <Lock sx={{mr: 2}} />
          Login with Discord
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
