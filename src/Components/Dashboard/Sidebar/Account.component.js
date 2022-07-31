import Box from "@mui/material/Box";
import { Avatar, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ArrowDropDown } from "@mui/icons-material";

/**
 * TODO
 * 1) Avatar display Discord profile picture
 *    Alternative...credentials
 * 2) Name below Avatar
 *    Account options in dropdown menu
 *    (Profile page, Settings, Project selection, Signout)
 */

const Account = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Avatar>YT</Avatar>
      <Box sx={{ display: "flex", textAlign: "left", alignItems: "center"}}>
        <Typography sx={{ mt: 2, width: "90%"}} variant="body1">
          York Treinies
        </Typography>
        <Tooltip title="Account Options" style={{alignSelf: "flex-end"}}>
          <IconButton size="small">
            <ArrowDropDown />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Account;