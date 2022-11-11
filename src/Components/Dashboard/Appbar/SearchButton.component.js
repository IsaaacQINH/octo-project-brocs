import IconButton from "@mui/material/IconButton";
import { Search } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ResponsiveDialog from "../Shared/ResponsiveDialog.component";
import { useState } from "react";

const SearchButton = () => {
  const [open, setOpen] = useState(false);

  const handleDialogConfirmation = () => {
    setOpen(false);
  }

  const handleDialogClose = () => {
    setOpen(false);
  }

  return (
    <>
      <IconButton
        sx={{mr: {xs: 1, sm: 0}, float: "right", borderRadius: 5}}
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(true)}
      >
        <Search />
        <Typography sx={{display: {xs: "none", sm: "block"}}} variant="h6">Search</Typography>
      </IconButton>
      <ResponsiveDialog
      title={"Development Notice"}
      content={"This is not an implemented Feature yet!"}
      open={open}
      actionName="OK"
      color="info"
      action={handleDialogConfirmation}
      handleClose={handleDialogClose}
      />
    </>
  );
}

export default SearchButton