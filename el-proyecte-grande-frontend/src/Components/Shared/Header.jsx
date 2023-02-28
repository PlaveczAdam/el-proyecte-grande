import { useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Header = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const userLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="Header">
      <Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <Grid item xs={12} md={6} paddingX={2}>
            <span>Logged in as </span>
            <Tooltip
              title={
                "Roles: " + (auth.user.roles ? auth.user.roles : "No roles")
              }
            >
              <span>
                <b>{auth.user.username ? auth.user.username : "N/A"}</b> (
                {auth.user.email ? auth.user.email : "N/A"})
              </span>
            </Tooltip>
            <Button variant="outlined" size="small" onClick={userLogout} sx={{marginLeft:2}}>
              Log out
            </Button>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <ApartmentIcon sx={{ transform: "scale(3)"}} />
            </Box>
          </Grid>
          <Grid xs={10}>
            <Box
              sx={{ marginBottom: 2, textAlign: "center", paddingBottom: 1 }}
            >
              <Typography variant="h4" sx={{ padding: 1 }}>
                Grande Hotel Management System
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Header;
