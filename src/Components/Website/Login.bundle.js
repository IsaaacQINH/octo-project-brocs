import Box from "@mui/material/Box";
import {Button, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { supabase } from "../../Helper/supabaseClient";
import { Navigate } from "react-router-dom";
import SvgWrapperComponent from "../../Shared/SvgWrapper.component";
// eslint-disable-next-line import/no-unresolved
import DiscordIcon from 'jsx:../../Shared/Assets/discord-mark-blue.svg';


const Login = () => {
  const handleDiscordSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn({
      provider: 'discord',
    });

    if (error) {
      console.error(error);
      return (<Navigate to="login" />);
    }
  }

  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Paper elevation={5} sx={{p: 4, borderRadius: 10, mt: "10em"}}>
        <Typography variant="h4">Login</Typography>
        <Typography variant="body1">Create or login to your account with Discord</Typography>
        <Divider sx={{p: 2}} />
        <Button variant="outlined" size="large" sx={{width: "100%", mt: 2}} onClick={handleDiscordSignIn}>
          <SvgWrapperComponent sx={{mr: 2, width: 24, height: 24}} svg={<DiscordIcon />} />
          Login with Discord
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;