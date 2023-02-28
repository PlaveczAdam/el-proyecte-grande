import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WarningSnackbar = ({ opened, message, closed }) => {
  const [, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closed();
    setOpen(false);
  };

  return (
    <Snackbar open={opened} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default WarningSnackbar;
