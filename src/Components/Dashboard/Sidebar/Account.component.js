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

const Account = ({user, handleOpenUserMenu, handleCloseUserMenu}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Avatar alt={user ? user.user_metadata.full_name : "name"} src={user ? user.user_metadata.avatar_url : "null"} />
      <Box sx={{ display: "flex", textAlign: "left", alignItems: "center"}}>
        <Typography sx={{ mt: 2, width: "90%"}} variant="body1">
          {user ? user.user_metadata.full_name : "NullAccount"}
        </Typography>
        <Tooltip title="Account Options" style={{alignSelf: "flex-end"}}>
          <IconButton size="small" onClick={handleOpenUserMenu}>
            <ArrowDropDown />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Account;