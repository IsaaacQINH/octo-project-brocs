import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import {green} from "@mui/material/colors";

const ResponsiveDialog = ({title, content, actionName, action, handleClose, open, color, loading}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {
            typeof description === 'string' ?
                <DialogContentText>
                  {content}
                </DialogContentText> :
                content
          }
        </DialogContent>
        <DialogActions>
          <Button color={color} onClick={action} disabled={loading}>
            {actionName}
          </Button>
          <Button color="primary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
        {loading && (
            <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
            />
        )}
      </Dialog>
    </Box>
  );
}

export default ResponsiveDialog;